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
