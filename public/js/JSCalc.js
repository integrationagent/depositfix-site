// Define gateway prices
var fees = [
	{
		gateway: 'Authorize.Net',
		link: 'http://www.authorize.net',
		variable: 2.9,
		fixed: 0.30,
		monthly: 25,
		chargeback: 25,
		other: [{'setup fee': 49}]
	},
	{
		gateway: 'Braintree Payments',
		link: 'https://www.braintreepayments.com',
		variable: 2.9,
		fixed: 0.30,
		monthly: 0,
		chargeback: 15,
		other: []
	},
	// {
	// 	gateway: 'Heartland Payment Systems',
	// 	link: 'https://www.heartlandpaymentsystems.com/',
	// 	variable: 0,
	// 	fixed: 0.05,
	// 	monthly: 59,
	// 	chargeback: 25,
	// 	other: []
	// },
	{
		gateway: 'Stripe',
		link: 'https://stripe.com',
		variable: 2.9,
		fixed: 0.30,
		monthly: 0,
		chargeback: 15,
		other: []
	},
	{
		gateway: 'WePay',
		link: 'https://go.wepay.com',
		variable: 2.9,
		fixed: 0.30,
		monthly: 0,
		chargeback: 15,
		other: []
	},
	{
		gateway: 'Amazon Payments',
		link: 'https://payments.amazon.com',
		variable: 2.9,
		fixed: 0.30,
		monthly: 0,
		chargeback: 20,
		other: []
	},
	{
		gateway: 'BluePay',
		link: 'https://www.bluepay.com',
		variable: 2.29,
		fixed: 0.05,
		monthly: 15,
		chargeback: 15,
		other: [{'PCI compliance fee': 10.75}]
	},
	{
		gateway: 'PayPal',
		link: 'https://www.paypal.com',
		variable: 2.9,
		fixed: 0.30,
		monthly: 0,
		chargeback: 20,
		other: []
	}
];

var app = angular.module("fees", []);
app.controller("feesCtrl", function($scope, $filter) {
	$scope.fees = fees;
	$scope.numOfTransactions = 0;
	$scope.monthlyRevenue = 0;
	$scope.numOfChargebacks = 0;
	$scope.numOfTransactionsToCount = 0;
	$scope.monthlyRevenueToCount = 0;
	$scope.numOfChargebacksToCount = 0;

	$scope.calculateFees = function () {
		$scope.numOfTransactions = parseInt($scope.numOfTransactionsToCount.toString().replace(/\D/g,''));
		$scope.monthlyRevenue = parseInt($scope.monthlyRevenueToCount.toString().replace(/\D/g,''));
		$scope.numOfChargebacks = parseInt($scope.numOfChargebacksToCount.toString().replace(/\D/g,''));
		angular.forEach($scope.fees, function(fee) {
			fee.transactional = 0.01 * fee.variable * $scope.monthlyRevenue + fee.fixed * $scope.numOfTransactions;
			fee.transactional = parseFloat(fee.transactional.toFixed(2));

			var _totalOther = 0;
			angular.forEach(fee.other, function(otherFee) {
				angular.forEach(otherFee, function(key,val) {
					if (key === parseFloat(key)) {
						_totalOther += key;
					}
				});
			});
			fee.totalOther = _totalOther;

			fee.totalChargeback = fee.chargeback * $scope.numOfChargebacks;

			fee.total = 0.01 * fee.variable * $scope.monthlyRevenue + fee.fixed * $scope.numOfTransactions + fee.monthly + fee.totalOther + fee.totalChargeback;
			fee.total = parseFloat(fee.total.toFixed(2));
		});
		$scope.fees = $filter('orderBy')(fees, 'total');
	};
});

