
# Troubleshooting Supabase Realtime

### Problems Encountered
Initially, realtime updates were not working despite correct subscription code.
- UI did not update automatically.
- No realtime events were received.
- Console logs showed no realtime activity.

###  Debugging Process
According to the [Supabase Documentation](https://supabase.com/docs/guides/realtime/postgres-changes), additional configuration is required.

###  Solutions

#### 1. Enable Realtime Publication
Realtime is not enabled by default for tables.
```sql
alter publication supabase_realtime add table bookmarks;
```

#### 2. Set Replica Identity to FULL
Required to ensure the realtime payload contains the complete row data.
```sql
alter table bookmarks replica identity full;
```

#### 3. Add Required RLS Policies
Realtime requires explicit `SELECT` permissions.
```sql
create policy "Enable realtime select"
on bookmarks
for select
using (auth.uid() = user_id);
```

#### 4. Use Client Components
Realtime subscriptions must reside in client-side components.
```javascript
"use client"
```

#### 5. Verify Subscription Status
Log the status to confirm a successful connection.
```javascript
.subscribe((status) => {
  console.log("Realtime status:", status)
})
```
*Expected output:* `Realtime status: SUBSCRIBED`

### Final Realtime Flow
1. **User adds bookmark**
2. **Supabase database updates**
3. **Supabase Realtime detects change**
4. **WebSocket sends event**
5. **React state updates**
6. **UI updates instantly**
```
