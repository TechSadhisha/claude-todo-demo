# Inbox welcome automation

Automatically replies "Welcome to Sadhisha Homes" to genuine new people who email the
business inbox.

- **Where it runs:** n8n, workflow `Sadhisha Homes — Inbox Welcome Responder`
  (id `E4SQSnwTbmimqarD`), in the `Sadhisha` personal project.
- **Status:** published and active.
- **Credential:** the existing `Gmail account` OAuth2 credential (`tSt6kBlHMrpMBGZm`).
  The reply is sent from whichever Gmail account that credential is authorised for,
  with the display name `Sadhisha Homes`.

## Message sent

```
Welcome to Sadhisha Homes

Thank you for reaching out to us. We have received your message and a member of our
team will get back to you shortly.

Warm regards,
Sadhisha Homes
```

It goes out as a reply on the sender's own thread, to the sender only, with n8n's
"sent automatically with n8n" attribution turned off.

## How it works

| Node | Does |
| --- | --- |
| Check Inbox | Gmail Trigger, polls every 15 minutes, at most 10 messages per poll |
| Keep Only Real People | Filter, drops no-reply and bulk-sender domains |
| Send Welcome Reply | Gmail reply with the welcome text |
| Mark Thread As Welcomed | Applies the `Welcome Sent` Gmail label (`Label_17`) |

## Why the filtering is aggressive

The inbox holds roughly 94,000 threads and 86,000 unread messages, and almost all
recent arrivals are automated — GitHub, LinkedIn, GoDaddy, brokers, job boards and
newsletters. An unfiltered auto-responder would reply to those robots from a personal
address, which achieves nothing and risks the account being flagged as a spam source.

Two layers keep that from happening. The trigger's Gmail query excludes the
Promotions, Social, Updates and Forums categories, anything containing the word
"unsubscribe", mail from the account itself, and common automated local-parts
(`noreply`, `donotreply`, `mailer`, `postmaster`, `billing`, `statements` and
similar). The Filter node then drops known bulk-sender domains and requires the
sender to look like a real address.

To loosen or tighten the behaviour, prefer editing the Filter node — the trigger
query is harder to debug because non-matching mail never enters the workflow.

## Never welcoming anyone twice

De-duplication is the pairing of two things, and it only works while both are in place:

1. The trigger query contains `-label:"Welcome Sent"`.
2. `Mark Thread As Welcomed` applies that label after the reply is sent.

Remove either one and every sender gets welcomed again on every poll. The labelling
step runs after the send on purpose: if it fails mid-run the worst case is one
duplicate welcome, rather than a person who is marked as welcomed but never received
anything.

## Things to check

- Confirm which Gmail account the `Gmail account` credential is authorised for. The
  n8n project belongs to `tech.sadhisha@gmail.com`, so if replies should come from
  `amazonbipin@gmail.com`, verify that before relying on it.
- The first few live replies are worth reading, to confirm no automated sender slips
  past the filters. Any that does should be added to the Filter node.
