#!/usr/bin/env bash
set -euo pipefail
task_app_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
task_parent="$(dirname "$task_app_root")"
task_state="${TEA_DEPLOY_DIR:-$task_app_root/.local/deploy}"
task_project="${TEA_COMPOSE_PROJECT:-xinrui-tea}"
[[ "$task_project" =~ ^[a-z0-9][a-z0-9_-]*$ ]] || { echo 'Invalid Compose project name' >&2; exit 1; }
[[ -f "$task_state/.env" ]] || { echo 'Run bash deploy/deploy.sh first; local credentials are missing.' >&2; exit 1; }
export BACKEND_DIR="${BACKEND_DIR:-$task_parent/RuoYi-Vue}"
export ADMIN_DIR="${ADMIN_DIR:-$task_parent/RuoYi-Vue3}"
if docker compose version >/dev/null 2>&1; then
    task_compose=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
    task_compose=(docker-compose)
else
    echo 'Docker Compose v2+ is required.' >&2
    exit 1
fi
exec "${task_compose[@]}" --project-name "$task_project" --env-file "$task_state/.env" -f "$task_app_root/deploy/compose.yaml" "$@"
