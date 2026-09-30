#!/usr/bin/env bash
set -euo pipefail
umask 077
task_app_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
task_state="${TEA_DEPLOY_DIR:-$task_app_root/.local/deploy}"
mkdir -p "$task_state/backups"
task_archive="$(mktemp "$task_state/backups/tea-$(date -u +%Y%m%dT%H%M%SZ)-XXXXXXXX.sql")"
if bash "$task_app_root/deploy/compose.sh" exec -T mysql sh -c 'MYSQL_PWD="$MYSQL_PASSWORD" exec mysqldump --no-tablespaces --single-transaction --set-gtid-purged=OFF -utea tea' > "$task_archive"; then
    chmod 600 "$task_archive"
    echo "Private database backup: $task_archive"
    echo 'Also preserve Docker uploads volume and private deployment .env. This is NOT a public seed file.'
else
    echo "Backup FAILED; incomplete output retained for diagnosis: $task_archive" >&2
    exit 1
fi
