+++
draft = false
title = "How to integrate HubSpot form and PayPal"
date = "2017-01-31T10:54:05-06:00"
url = "hubspot-paypal"
author = "Denis Lunev"
image = "/img/hubspot-paypal/cover.png"
categories = ["HubSpot", "Payments"]
+++


When you need to collect payments from your website PayPal button might be the best solution.

However, if you need to collect some information to send to HubSpot form first before the payment – that's not that easy.

The following code allows you to redirect your customers to PayPal account after after filling out the form.

<img src="/img/hubspotForm.png" />

After the form being submitted, it automatically redirects to your business PayPal page with predefined amount and product name.

<img src="/img/paypalcheckout.png" />

Here is the complete source code:

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<!--[if lte IE 8]>
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2-legacy.js"></script>
<![endif]-->
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>

<form action="https://www.paypal.com/cgi-bin/webscr" method="post" id="paypalform">
    <input type="hidden" name="item_name" value=""/>
    <input type="hidden" name="amount" value=""/>
    <input type="hidden" name="quantity" value="1">
    <input type="hidden" name="cmd" value="_xclick"/>
    <input type="hidden" name="custom" value="true"/>
    <input type="hidden" name="business" value=""/>
</form>
<div id="hs-form-container"></div>


<script>

    var HubSpotPayPal = {

        init: function (params) {

            HubSpotPayPal.initPayPalForm(params.paypalEmail, params.amount, params.productName);

            hbspt.forms.create({
                portalId: params.hubSpotPortalId,
                formId: params.hubSpotFormId,
                target: "#hs-form-container",
                onFormSubmit: function ($form) {
                    setTimeout(function () {
                        $("#paypalform").submit();
                    }, 10);
                    return false;
                }
            });
        },

        initPayPalForm: function(paypalEmail, amount, productName){

            $("#paypalform [name='business']").val(paypalEmail);
            $("#paypalform [name='amount']").val(amount);
            $("#paypalform [name='item_name']").val(productName);
        }
    }

    HubSpotPayPal.init({
        paypalEmail: "den.lunev@gmail.com",
        amount: "170",
        productName: "My New Product",
        hubSpotPortalId: "2767376",
        hubSpotFormId: "14109ada-6a61-4d63-a1db-430b6ce0926d"
    });

</script>


```

You just need to update the last part:

```
HubSpotPayPal.init({
    paypalEmail: "[Your PayPal business account]",
    amount: "[Amount]",
    productName: "[Name of your product or service]",
    hubSpotPortalId: "[Your HubSpot portal Id]",
    hubSpotFormId: "[Your HubSpot form Id]"
});

```


Looking for complete payment solution for HubSpot?
Check <a href="http://www.depositfix.com/">DepositFix</a>.
