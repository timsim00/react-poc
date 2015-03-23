exports.emailData = {
  "columns" : ["Name","Subject", "Created", "Last Modified", "Actions"],
  "rows" : [
       [
       "Sample Email 1",
       "Check out our latest news",
       "2/20/2015 12:50PM",
       "2/20/2015 12:52PM"
       ],
       [
       "Derive - Room Preferences are set",
       "Your room preferences have been set",
       "1/25/2015 5:52PM",
       "2/5/2015 9:57PM"
       ]
  ]
};

exports.sendsData = {
  "columns" : ["Email Name","Subject", "Sent On", "Status", "Subscribers", "Opens", "Clicks", "Bounced", "Actions"],
  "rows" : [
       [
       "Sample Email 1",
       "Check out our latest news",
       "3/12/2015 12:50PM",
       "Complete",
       "23",
       "24%",
       "2%",
       "0%"
       ],
       [
       "Sample Email 1",
       "Check out our latest news",
       "3/17/2015 2:34PM",
       "Complete",
       "12",
       "44%",
       "50%",
       "0%"
       ]
  ]
};

exports.recentSendData = {
    "subject": "Did you forget something?",
    "name": "Abandoned Cart - Low Value"
};

exports.recentModifiedData = {
    "subject": "Check out our latest news",
    "name": "Sample Email 1",
    "dates" : {
        "created": "2/20/15 12:06 PM",
        "modified": "3/1/15 10:32 AM"
    }

};

exports.contentData = [
	{category: "Retirement", type: "newsletter", imgUrl: "http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png", id: "febNews", title: "February Newsletter"},
	{category: "Retirement", type: "newsletter", imgUrl: "http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png", id: "marchNews", title: "March Newsletter"},
	{category: "Retirement", type: "newsletter", imgUrl: "http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png", id: "aprilNews", title: "April Newsletter"},
	{category: "Retirement", type: "newsletter", imgUrl: "http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png", id: "mayNews", title: "May Newsletter"},
	{category: "Retirement", type: "advice", imgUrl: "http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png", id: "advice1", title: "Advice v.1"},
	{category: "Retirement", type: "advice", imgUrl: "http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png", id: "advice2", title: "Advice v.2"},
	{category: "Retirement", type: "managed", imgUrl: "http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png", id: "mc1", title: "Communications 1"},
	{category: "Mortgage", type: "managed", imgUrl: "http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png", id: "mortgage1", title: "ReFi Opportunity"},
	{category: "Mortgage", type: "managed", imgUrl: "http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png", id: "mortgage1", title: "Reverse Mortgage"},
	{category: "Mortgage", type: "managed", imgUrl: "http://image.exct.net/lib/fe6a1570706407787711/m/1/investorinsight.png", id: "mortgage1", title: "Home Equity Loan"}
];
