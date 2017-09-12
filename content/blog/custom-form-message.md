---
title: How to display custom error message in HubSpot form
author: Denis Lunev
date: 2015-12-16
aliases: ["/custom-form-message/"]
image: "/img/custom-error/cover.png"
dsq_thread_id:
  - 4409768319
categories:
  - HubSpot, Smart Form

---
HubSpot form has native validation and error message display, but sometimes you need to display a validation message not just for each field, but for entire form.

Unfortunately, HubSpot form API doesn&#8217;t provide a callback for failed validation.

But here is the workaround: we know that HS form inserts an element with an error message, so we can monitor that element after form being submitted:

<pre class="lang:default decode:true">&lt;script&gt;

	hbspt.forms.create({
        formId: 'c3794ad3-f6a7-4c98-841d-98062636baab',
		portalId: '1670983',
        onFormReady: function($form, ctx) {

            var errorMessage = "Your Error Message";

            $form.find("input[type='submit']").click(function(){
				var sbmt = $(this);

                window.setTimeout(function(){
					if($(".hs-error-msgs").length &gt; 0){
						//Put message on the top
						$form.prepend("&lt;div class='form-error-message'&gt;" + errorMessage + "&lt;/div&gt;")

						//Put message on the bottom
						sbmt.parent().prepend("&lt;div class='form-error-message'&gt;" + errorMessage + "&lt;/div&gt;")
					}else{
						$form.find(".form-error-message").remove();
					}

                //delay to make sure native hbspt form error already appeared
				}, 300);
			});
        }
    });
&lt;/script&gt;


&lt;style&gt;
	.form-error-message {
		color: #ff0000;
		font-weight: bold;
		padding: 15px 0px;
	}
&lt;/style&gt;</pre>

You can display your message on top or on the bottom.
  
Here is a working example of this kind of form:


  
This functionality will be included to the SmartForm plugin we are developing: <http://integrationagent.com/smartforms>

