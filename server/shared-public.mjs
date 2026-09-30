import { ok, fail, clone, paginate, publicCatalog } from './demo/data.mjs';
import { ensureAuctions, auctionView } from './demo/auction.mjs';

const description = product => String(product.description || '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('\n','<br>');
const auctionTime = auction => ({new_time:Math.floor(Date.now()/1000),start_time:auction ? Date.parse(auction.startTime)/1000 : 0,start_buy_time:auction ? Date.parse(auction.startTime)/1000 : 0,end_time:auction ? Date.parse(auction.endTime)/1000 : 0});

export function categories(state) {
  return [{category_id:0,name:'全部商品'},...(state.content?.categories || []).map(c=>({category_id:Number(c.category_id),name:c.name}))];
}

// Shared storefront reads only persisted business records, never demo samples.
export function sharedPublic(store, route, p, user) {
  const products=publicCatalog(store);
  if (route==='/index/getSubscribeSetting') return ok({is_open:0,message:'预约收费及通知规则尚未配置，当前未开放'});
  if (['/auction/list','/auction/detail','/goods/getLootDetails','/loodgoods/getCategoryGoodsList','/goods/getPurchaseNum','/goods/getIsAuction'].includes(route)) {
    const auctions=ensureAuctions(store).filter(a=>a.status!=='cancelled' && a.status!=='draft' && products.some(x=>String(x.goods_id)===String(a.goodsId)));
    if (route==='/auction/list') return ok({list:auctions.map(a=>auctionView(store,a,user?.member_id,false))});
    if (route==='/auction/detail') {
      const requested=p.auction_id ?? p.auctionId ?? p.id;
      const auction=auctions.filter(a=>(requested ? String(a.auctionId)===String(requested) : !!p.goods_id) && (!p.goods_id || String(a.goodsId)===String(p.goods_id))).sort((a,b)=>Date.parse(b.createdAt)-Date.parse(a.createdAt))[0];
      return auction ? ok(auctionView(store,auction,user?.member_id)) : fail('拍卖场次不存在或未发布');
    }
    if (route==='/loodgoods/getCategoryGoodsList') {
      const selected=auctions.filter(a=>['scheduled','running'].includes(a.status) && (!p.specialarea_id || String(a.auctionId)===String(p.specialarea_id)));
      const list=selected.map(a=>{
        const product=products.find(x=>String(x.goods_id)===String(a.goodsId));
        const view=auctionView(store,a,user?.member_id,false);
        return {...clone(product),goods_price:view.currentPrice,image:product.goods_image,goods_no:'TEA-'+product.goods_id,consignment_member_name:'平台',pay_status:a.status==='running'?'竞价中':'待开拍',is_order:0,auction:view};
      });
      return ok({time_info:auctionTime(selected.length===1 ? selected[0] : null),list:paginate(list,p)});
    }
    const product=products.find(x=>String(x.goods_id)===String(p.goods_id));
    if (!product) return fail('商品不存在或已下架');
    const requested=p.auction_id ?? p.auctionId;
    const matching=auctions.filter(a=>String(a.goodsId)===String(product.goods_id));
    const auction=requested ? matching.find(a=>String(a.auctionId)===String(requested)) : matching.sort((a,b)=>Date.parse(b.createdAt)-Date.parse(a.createdAt))[0];
    if (requested && !auction) return fail('拍卖场次不存在或与商品不匹配');
    if (route==='/goods/getLootDetails') {
      const order=p.order_id ? user?.warehouse.find(x=>String(x.order_id)===String(p.order_id) && String(x.goods_id)===String(product.goods_id)) : null;
      if (p.order_id && !order) return fail('仓库订单不存在或无权查看');
      const view=auctionView(store,auction,user?.member_id);
      return ok({...clone(product),...(order ? clone(order) : {}),content:description(product),image:[{file_path:product.goods_image}],goods_no:'TEA-'+product.goods_id,value:view?.currentPrice || product.goods_min_price,goods_price:view?.currentPrice || product.goods_min_price,is_order:0,consignment_member_name:'平台',time_info:{...auctionTime(auction),stock_num:auction ? Number(auction.quantity) : Number(product.spec?.[0]?.stock_num || 0)},auction:view});
    }
    if (matching.some(a=>['scheduled','running'].includes(a.status))) return fail('竞价商品请通过出价参与');
    const stock=Number(product.spec?.[0]?.stock_num || 0);
    if (!Number.isSafeInteger(stock) || stock<1) return fail('库存不足');
    // This is available stock, not an invented per-member purchase policy.
    return route==='/goods/getIsAuction' ? ok(1) : ok({num:stock,purchase_num:stock,limit_num:stock,source:'available_stock'});
  }
  if (route==='/goods/getCategory') return ok({categoryList:categories(store.state)});
  if (route==='/category/getCategoryGoodsList') {
    let list=products.filter(x=>!Number(p.category_id) || Number(x.category_id)===Number(p.category_id));
    if (Number(p.product_types)===3) list=list.map(x=>({...clone(x),product_types:3,score_price:x.goods_min_price}));
    return ok({list:paginate(list,p)});
  }
  if (['/shopgoods/getDetails','/score/getDetails'].includes(route)) {
    const product=products.find(x=>String(x.goods_id)===String(p.goods_id));
    if (!product) return fail('商品不存在或已下架');
    const detail={...clone(product),goods_price:product.goods_min_price,value:product.goods_min_price,image:[{file_path:product.goods_image}],content:description(product)};
    if (route==='/score/getDetails') {
      detail.product_types=3; detail.score_price=detail.goods_min_price;
      detail.spec=detail.spec.map(s=>({...s,score_price:s.goods_price,goods_price:'0.00',spec_sku_id:'score'+s.spec_sku_id}));
    }
    return ok({detail});
  }
  if (['/notice/getNotice','/notice/getNoticeInfo'].includes(route)) {
    const notices=(store.state.adminNotices || []).filter(n=>String(n.status ?? '0')==='0').map(n=>({...clone(n),id:n.noticeId ?? n.id,title:n.noticeTitle ?? n.title,content:n.noticeContent ?? n.content}));
    if (route==='/notice/getNotice') return ok(notices);
    const notice=notices.find(n=>String(n.id)===String(p.id || p.notice_id));
    return notice ? ok(notice) : fail('公告不存在或已停用');
  }
  if (route==='/goods/getGoodsEvaluation') {
    const list=store.state.users.flatMap(u=>u.reviews.map(r=>({...clone(r),member:{nickName:u.nickName,avatarUrl:u.headimg}}))).filter(r=>!p.goods_id || String(r.goods_id)===String(p.goods_id));
    return ok({list:paginate(list,p)});
  }
}
