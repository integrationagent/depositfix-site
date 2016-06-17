+++
date = "2016-06-16T10:35:19-05:00"
draft = false
title = "Payment Gateways Fee Calculator"

+++

There are a lot of payment gateways available for your online business. Which one is right for you? One of the most important aspects to consider is transaction fee. We've created a fee calculator to help you to choose the right service.

<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script type="text/javascript" src="/js/JSCalc.js"></script>
<link rel="stylesheet" type="text/css" href="/css/JSCalc.css" media="screen"/>


<div ng-app="fees" ng-controller="feesCtrl" class="calc">
			<form>
				<div>Average monthly revenue ($)
					<div ng-form name="revenue">
						<input class="Input" name="monthlyRevenue" ng-model="monthlyRevenueToCount" required/>
						<span ng-show="revenue.monthlyRevenue.$touched && revenue.monthlyRevenue.$invalid">Please enter the value</span>
					</div>
					<div>Average number of transactions</div>
					<div ng-form name="transactions">
						<input class="Input" name="numOfTransactions" ng-model="numOfTransactionsToCount"
						       required/>
						<span ng-show="transactions.numOfTransactions.$touched && transactions.numOfTransactions.$invalid">Please enter the value</span>
					</div>
					<div>
						<button type="submit" class="Button" ng-click="calculateFees(); clicked=true">Calculate</button>
					</div>
				</div>
			</form>
			<div ng-show="clicked" class="Table">
				<div class="Heading">
					<div class="Cell">
						Service
					</div>
					<div class="Cell">
						Transaction fee
					</div>
					<div class="Cell">
						Monthly fee
					</div>
					<div class="Cell">
						Other
					</div>
					<div class="Cell">
						Total
					</div>
				</div>
				<div class="Row" ng-repeat="fee in fees">
					<div class="Cell">
						<a ng-href="{{fee.link}}">{{fee.gateway}}</a>
					</div>
					<div class="Cell">
						${{fee.transactional}}
					</div>
					<div class="Cell">
						${{fee.monthly}}
					</div>
					<div class="Cell">
						<div ng-if="!fee.other.length">$0</div>
						<div ng-if="fee.other.length">
							<div ng-repeat="other in fee.other">
								<div ng-repeat='(key,val) in other'>${{val + ' (' + key + ') '}}</div>
							</div>
						</div>
					</div>
					<div class="Cell">
						${{fee.total}}
					</div>
				</div>
			</div>
		</div>

{{< cta text="Looking for a service to accept payment for HubSpot?" button="Try DepositFix" link="/" >}}



