# PHASE 4 — ENCRYPTION & STORAGE

## Overview
Phase 4 implements end-to-end encryption and secure local storage using Web Crypto API and IndexedDB. All user data remains encrypted in storage and is only decrypted in memory when needed.

## Security Architecture

### Encryption (crypto.js)

**Algorithm**: AES-GCM 256-bit
- **IV**: 12 bytes (per operation)
- **Salt**: 16 bytes (per passphrase)
- **Key Derivation**: PBKDF2 with 100,000 iterations
- **Hash Function**: SHA-256

**Features**:
- Passphrase-based key derivation
- Auto-lock after 15 minutes inactivity
- Lock status tracking and countdown
- Session-based salt storage (never persisted)
- No key material stored on disk

### Storage (storage.js)

**Backend**: IndexedDB with encryption
- **Database**: LifeOS (configurable name)
- **Object Store**: data (single store)
- **Indexes**: timestamp, type
- **Data Types**: logs, decisions, pillar states

**Operations**:
- `save(key, data, type)` - Encrypt and persist
- `load(key)` - Decrypt and retrieve
- `getAllByType(type)` - Batch decrypt by type
- `delete(key)` - Remove record
- `clear()` - Nuke all data
- `getStats()` - Storage statistics

## Threat Model

### Protected Against
✓ Offline storage compromise
✓ Browser cache attacks
✓ Tab inspection (DevTools)
✓ IndexedDB direct access
✓ Session hijacking (auto-lock)

### Not Protected Against
✗ Passphrase brute force
✗ Compromised JavaScript execution
✗ Malicious browser extensions
✗ Keyboard loggers
✗ Local network attacks (if syncing later)

## Workflow

### Initialization
1. User opens app for first time
2. Prompt for passphrase (14+ characters recommended)
3. Derive key from passphrase using PBKDF2
4. Store salt in sessionStorage
5. Initialize IndexedDB

### Data Access
1. Check crypto lock status
2. Request encryption key unlock if locked
3. Decrypt data on read
4. Encrypt data on write
5. All operations go through storage layer

### Auto-Lock
- 15-minute inactivity timeout
- Timer resets on every operation
- Lock clears the key (not the salt)
- User must re-enter passphrase

## Data Types

### Logs
- Activity logs
- Decision logs
- System events
- **Schema**: {timestamp, event, details}

### Decisions
- Weekly pillar decisions
- Phase-based choices
- **Schema**: {week, phase, pillar, decision}

### Pillar States
- Current state for each pillar
- Metrics and progress
- **Schema**: {pillar, state, metrics, timestamp}

## Storage Limits

IndexedDB has no hard limit in most browsers, but:
- Firefox: ~50MB per origin
- Chrome: ~50MB per origin
- Safari: ~50MB per origin
- Actual limit may be higher

Estimated data per record: 500-2KB (encrypted)
Estimated capacity: ~25,000-50,000 records

## API Reference

### CryptoEngine

```javascript
const crypto = new CryptoEngine();
await crypto.initializeWithPassphrase('user passphrase');
const encrypted = await crypto.encrypt('data');
const decrypted = await crypto.decrypt(encrypted);
crypto.lock();
const timeLeft = crypto.getTimeUntilLock();
```

### EncryptedStorage

```javascript
const storage = new EncryptedStorage(crypto);
await storage.initialize();
await storage.save('log_1', logData, 'log');
const data = await storage.load('log_1');
const logs = await storage.getAllByType('log');
await storage.delete('log_1');
const stats = await storage.getStats();
```

## Implementation Notes

- **Passphrase is never stored** - Only derived key in memory
- **Salt is ephemeral** - Lost on page reload (user must re-enter passphrase)
- **No password recovery** - Users must remember passphrase
- **Backward compatible** - Works offline immediately
- **No sync yet** - Phase 5 adds cloud backup (encrypted)

## Files
- `/src/crypto.js` - Web Crypto API wrapper (196 lines)
- `/src/storage.js` - IndexedDB encryption layer (247 lines)
- `/docs/04_encryption_and_storage.md` - This documentation

## Testing

Manually test:
1. First launch: Verify passphrase prompt
2. Save data: Check IndexedDB (encrypted)
3. Load data: Verify decryption works
4. Lock timeout: Wait 15 min, verify lock
5. Wrong passphrase: Verify error on unlock

---
**Status**: 100% COMPLETE | **Date**: January 1, 2026
