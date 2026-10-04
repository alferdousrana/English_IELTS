import { useProgress } from '../state/ProgressContext.jsx';

const TEXT = {
  idle: ['Ready', 'ok', ''], synced: ['Synced with Firebase', 'ok', 'Synced'], syncing: ['Syncing…', 'busy', 'Syncing'],
  pending: ['Saved on device, syncing soon', 'busy', 'Pending'], offline: ['Offline: progress saved on this device', 'warn', 'Offline'],
  error: ['Sync failed: saved on device, will retry', 'warn', 'Retry'], local: ['Local only: not synced', 'warn', 'Local']
};

export default function SyncBadge() {
  const { sync, flush } = useProgress();
  const [text, tone, short] = TEXT[sync] || TEXT.idle;
  return (
    <button type="button" className={`sync sync-${tone}`} onClick={() => flush()} title={text} aria-label={`${text}. Sync now`}>
      <span className="sync-dot" aria-hidden="true" />
      <span className="sync-short" aria-hidden="true">{short}</span>
      <span className="sync-text">{text}</span>
    </button>
  );
}
