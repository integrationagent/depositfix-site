+++
date = "2016-08-18T15:09:13-05:00"
draft = false
title = "DepositFix Setup"

+++

<style>
.hs_field{
	color: #aaa;
}
</style>

### 1. Create HubSpot Fields (required)

- <b>Last Paid Amount</b> <span class="hs_field">(last_paid_amount: Single Line Text)</span>
- <b>Last Payment Result Text</b> <span class="hs_field">(last_payment_result_text: Single Line Text)</span>
- <b>Last Product Purchased</b> <span class="hs_field">(last_product_purchased: Single Line Text)</span>
- <b>Payment Status</b> <span class="hs_field">(paymentstatus: Dropdown select. Values: Paid, Failed, Pending)</span>
- <b>Reference Number</b> <span class="hs_field">(reference_number: Single Line Text)</span>
- <b>Remaining Balance</b> <span class="hs_field">(remaining_balance: Single Line Text)</span>
- <b>Stripe Customer Id</b> <span class="hs_field">(stripecustomerid: Single Line Text)</span>

<img src="/img/setup/hubspot_fields.png" class="screenshot"/>


### 2. Add workflows for successfull and failed transactions (optional)

DepositFix can run defined workflows after the charges. Workflows can be used for payment receipts, notifications or any other automated procesess.

It should be a standard workflow. 
<img src="/img/screenshots/workflows.png" class="screenshot"/> 
 
### 3. DepositFix Settings (required)
Now, let's setup your DepositFix account. You can login here:
<a href="https://depositfix.intagent.io/" target="_blank">DepositFix</a>

<img src="/img/setup/integrations_menu.png" class="screenshot"/>

First, you'll need to add HubSpot settings. HubSpot API Key and HubSpot Portal are required.

<img src="/img/setup/hubspot_settings.png" class="screenshot"/>

Specify Stripe settings.

<img src="/img/setup/stripe_settings.png" class="screenshot"/>

Copy generated code to your page and fill out the placeholders.
 
<img src="/img/setup/stripe_form.png" class="screenshot"/>

To get form Id login to HubSpot, navigate to specific form and copy Id from URL:

<img src="https://integrationagent.com/img/form-installation/form_id.png" class="screenshot"/>