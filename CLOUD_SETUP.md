# Perfect Builder Cloud Invoice Software

This package is prepared for **mobile + laptop cloud synchronization**.

## What is already included
- Responsive invoice software
- Dashboard
- New Invoice
- All Invoices + search
- Customers
- Project Total / Received / Remaining
- Notes, terms and variations
- Print/PDF
- Company settings
- Cloud URL + anon key fields
- Cloud sync code
- Supabase SQL schema

## One external setup is still required
I cannot create or access your Supabase account from inside this chat. You need to create a free Supabase project and copy its **Project URL** and **anon/public key**.

Then:
1. Open Supabase SQL Editor.
2. Run `supabase.sql`.
3. Publish this folder through GitHub Pages.
4. Open the software on your phone.
5. Settings -> Cloud Sync.
6. Paste the Supabase Project URL and anon/public key.
7. Save Cloud Settings -> Sync Now.
8. Use the same cloud settings on your laptop.

### Security
Never put a Supabase `service_role`/secret key into this website. Only the public anon key belongs in the browser.

### Next upgrade
For a real business-grade system with separate logins for staff and private customer data, enable Supabase Auth and user-based Row Level Security. This starter version is deliberately kept simple so you can get the shared database working first.
