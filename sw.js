// QatarSpec Pro Service Worker — DISABLED (self-unregistering)
// Previous versions caused cache lock-in issues. This version removes itself
// from every client to restore normal browser behavior, then does nothing.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', async () => {
  try {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
  } catch (e) {}
  // Unregister this service worker entirely
  await self.registration.unregister();
  // Force all open tabs to reload without a controller
  const clientsList = await self.clients.matchAll({ type: 'window' });
  clientsList.forEach(client => client.navigate(client.url));
});
