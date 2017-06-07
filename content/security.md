+++
date = "2017-06-16T10:35:19-05:00"
draft = false
title = "Security Information"

+++


Inside DepositFix we keep data about contacts (name, email, contact id from Stripe) and transactions (date, amount, product name, transaction id from Stripe). This information is kept to help you segment the purchases.
Credit card information (number, cvc, exp date) never sent to our servers, we use stripe tokens to charge the cards and they are not stored in our database.   

Since we don’t send or store information about the credit cards on our servers, DepositFix doesn't have to comply with the full [PCI spec](https://www.pcisecuritystandards.org/pci_security/why_security_matters). 
However, the whole process is PCI compliant, because Stripe or PayPal cover most of the requirements. On our side we use SSL encryption everywhere (Browser -> Stripe -> DepositFix -> HubSpot). The database only allows connections from the application itself and blocks everything else. 


DepositFix is backed by [Amazon AWS](https://aws.amazon.com/) which is proven and secure infrastructure provider:
 
* Amazon RDS (Postgres) as storage
* Amazon S3 as CDN for CSS and JS files
* CloudFlare as DNS provider
* The application is deployed as docker containers with auto recovery mode. 


**If HubSpot operate with 2 (or more) availability zones, then what about DepositFix?**

DepositFix is available in 2 availability zones, if one of the Amazon's data centers goes down, then we still be able to accept payments from your clients

---
**How are data backups managed?**

Database backups are automatically created every day and kept for 7 days.

---
**What framework/language is used to implement DepositFix?**

Backend: [Java + SpringBoot](http://projects.spring.io/spring-boot/) + [PostgreSQL](https://www.postgresql.org/). Frontend: [AngularJs](https://angularjs.org/) 

---
**What access controls are there around the contact & transaction data does DepositFix store and is the live environment distinct to the dev/staging environment?**

Production and test environments are separated and run in different virtual networks

---
**What structures are in place to prevent 'leakage'/'cross-talk' between their clients data sets? (e.g. altering parameters or inject something that makes me 'jump' into another client data-set or any compromised by cookie tweaking)?** 

We use [SpringSecurity](https://projects.spring.io/spring-security/), it provides protection against attacks like session fixation, clickjacking, cross site request forgery.

All private APIs (used from inside the application) are blocked for cross-domain requests. Also, there are filters checking for access right for specific objects.

There are number of public APIs that allow outside access (actual payment from HubSpot form). The only ID exposed publicly is User ID, but it's 32-char random String UUID which is hard to brute force. Even if you know the other customer ID all you can do is to submit payment to their account. 

---
**Is there a monitoring?**

We monitor Stripe and HubSpot APIs on backend, if either of those is down, we show an error message to user before injecting the form.
For monitoring of our services we use [UptimeRobot](https://uptimerobot.com/) and [Sentry](https://sentry.io).