#!/usr/bin/env bash
set -euo pipefail
umask 077
task_app_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
task_parent="$(dirname "$task_app_root")"
task_state="${TEA_DEPLOY_DIR:-$task_app_root/.local/deploy}"
task_mode="${1:-}"
[[ "$task_mode" == '' || "$task_mode" == '--prepare-only' ]] || { echo 'Usage: bash deploy/deploy.sh [--prepare-only]' >&2; exit 1; }
for task_command in git openssl; do
    command -v "$task_command" >/dev/null || { echo "Missing prerequisite: $task_command" >&2; exit 1; }
done
# Existing sibling source is preserved. No automatic pull, reset or cleanup.
for task_pair in 'RuoYi-Vue:xinrui-tea-backend' 'RuoYi-Vue3:xinrui-tea-admin'; do
    task_folder="${task_pair%%:*}"
    task_repo="${task_pair#*:}"
    if [[ ! -e "$task_parent/$task_folder" ]]; then
        git clone --branch main --single-branch "https://github.com/jiangyi3265/$task_repo.git" "$task_parent/$task_folder"
    fi
    [[ -f "$task_parent/$task_folder/Dockerfile" ]] || { echo "Missing deployment source: $task_parent/$task_folder/Dockerfile" >&2; exit 1; }
done
mkdir -p "$task_state"
chmod 700 "$task_state"
if [[ ! -f "$task_state/.env" ]]; then
    mkdir "$task_state/.initializing" || { echo 'Another setup is running; no credentials changed.' >&2; exit 1; }
    trap 'rmdir "$task_state/.initializing" 2>/dev/null || true' EXIT
    # Never log these values or use a public/default administrator password.
    # RuoYi's existing login contract allows at most 20 characters: 120 random bits.
    task_admin_password="$(openssl rand -base64 15)"
    task_temp="$(mktemp "$task_state/.env.XXXXXXXX")"
    {
        printf 'MYSQL_ROOT_PASSWORD=%s\n' "$(openssl rand -hex 32)"
        printf 'DB_PASSWORD=%s\n' "$(openssl rand -hex 32)"
        printf 'REDIS_PASSWORD=%s\n' "$(openssl rand -hex 32)"
        printf 'JWT_SECRET=%s\n' "$(openssl rand -hex 32)"
        printf 'TEA_ENGINE_SECRET=%s\n' "$(openssl rand -hex 32)"
        printf 'TEA_ADMIN_PASSWORD=%s\n' "$task_admin_password"
        printf 'TEA_SEED_MODE=sample\nWEB_BIND_ADDRESS=127.0.0.1\nH5_PORT=18000\nADMIN_PORT=18001\n'
    } > "$task_temp"
    chmod 600 "$task_temp"
    mv "$task_temp" "$task_state/.env"
    printf 'username: admin\npassword: %s\nPrivate local file. Do not commit or share.\n' "$task_admin_password" > "$task_state/admin-login.txt"
    chmod 600 "$task_state/admin-login.txt"
    unset task_admin_password
    rmdir "$task_state/.initializing"
    trap - EXIT
fi
if [[ "$task_mode" == '--prepare-only' ]]; then
    echo 'Source and private local configuration prepared. Containers have NOT been started.'
    exit 0
fi
command -v docker >/dev/null || { echo 'Docker Engine/Desktop is required; configuration is preserved.' >&2; exit 1; }
docker info >/dev/null 2>&1 || { echo 'Docker daemon is unavailable. Start Docker Engine/Desktop; no data was reset.' >&2; exit 1; }
bash "$task_app_root/deploy/compose.sh" config --quiet
bash "$task_app_root/deploy/compose.sh" up --build --detach --wait --wait-timeout 300
# Verify the real database-backed payload and both web proxy paths.
bash "$task_app_root/deploy/compose.sh" exec -T engine node --input-type=module -e '
async function read(url){const r=await fetch(url);if(!r.ok)throw Error("HTTP "+r.status);return r.json()}
const goods=await read("http://backend:8080/app/category/getCategoryGoodsList");
if(goods.code!==1||!Array.isArray(goods.data?.list?.data))throw Error("Business database read failed");
console.log("Business data and services ready; products:",goods.data.list.data.length);
'
bash "$task_app_root/deploy/compose.sh" exec -T storefront sh -c 'wget -qO- http://127.0.0.1/app/category/getCategoryGoodsList | grep -Eq '\''"code"[[:space:]]*:[[:space:]]*1'\'''
bash "$task_app_root/deploy/compose.sh" exec -T admin sh -c 'wget -qO- http://127.0.0.1/prod-api/captchaImage | grep -Eq '\''"code"[[:space:]]*:[[:space:]]*200'\'''
echo 'Deployment started. Default local entries: H5 http://127.0.0.1:18000 ; admin http://127.0.0.1:18001'
echo "Administrator credentials are stored only in: $task_state/admin-login.txt"
echo 'Custom ports are in the private .env. Public access requires your HTTPS reverse proxy and firewall policy.'
echo 'Existing data is preserved on repeat runs. Deployment success is not commercial release acceptance.'
