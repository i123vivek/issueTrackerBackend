define({ "api": [
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:email/userIssues",
    "title": "to get issues assigned to the user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"All issues found of a user\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"issueId\": \"69TFYu7GGQ\",\n                    \"issueStatus\": \"In-Progress\",\n                    \"issueTitle\": \"ertgvgh\",\n                    \"issueDescription\": \"vrtb\",\n                    \"issueReporter\": \"rahul rai\",\n                    \"issueReporterEmail\": \"rahul12@gmail.com\",\n                    \"issueAssignee\": \"\",\n                    \"issueAssigneeEmail\": \"satu@gmail.com\",\n                    \"issueCreatedOn\": \"2019-06-14T11:20:46.000Z\",\n                    \"screenshotName\": \"1560511234686_image\",\n                    \"screenshotPath\": \"uploads/1560511234686_image\"\n                },\n                {\n                    \"issueId\": \"5pmL7HgdX\",\n                    \"issueStatus\": \"In-Progress\",\n                    \"issueTitle\": \"ertgvgh\",\n                    \"issueDescription\": \"vrtb\",\n                    \"issueReporter\": \"rahul rai\",\n                    \"issueReporterEmail\": \"rahul12@gmail.com\",\n                    \"issueAssignee\": \"\",\n                    \"issueAssigneeEmail\": \"satu@gmail.com\",\n                    \"issueCreatedOn\": \"2019-06-14T11:20:46.000Z\",\n                    \"screenshotName\": \"1560511234459_image\",\n                    \"screenshotPath\": \"uploads/1560511234459_image\"\n                },\n                {\n                    \"issueId\": \"TkDL9fe7d\",\n                    \"issueStatus\": \"In-Progress\",\n                    \"issueTitle\": \"ertgvgh\",\n                    \"issueDescription\": \"testt---------------------------------------------\",\n                    \"issueReporter\": \"rahul rai\",\n                    \"issueReporterEmail\": \"rahul12@gmail.com\",\n                    \"issueAssignee\": \"\",\n                    \"issueAssigneeEmail\": \"satu@gmail.com\",\n                    \"issueCreatedOn\": \"2019-06-14T11:20:57.000Z\",\n                    \"screenshotName\": \"1560511253326_image\",\n                    \"screenshotPath\": \"uploads/1560511253326_image\"\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "GetApiV1UsersEmailUserissues"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/issue/:text/search",
    "title": "to search for issues for the give text .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "text",
            "description": "<p>text for search. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"issues present by this search text\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"issueId\": \"tEPvRajHj\",\n                    \"issueStatus\": \"done\",\n                    \"issueTitle\": \"title of issue1\",\n                    \"issueDescription\": \"description of issue1\",\n                    \"issueReporter\": \"vivek\",\n                    \"issueReporterEmail\": \"i123vivek@gmail.com\",\n                    \"issueAssignee\": \"rahul\",\n                    \"issueAssigneeEmail\": \"rahul12@gmail.com\",\n                    \"issueCreatedOn\": \"2019-06-05T19:26:16.000Z\",\n                    \"screenshotName\": \"\",\n                    \"screenshotPath\": \"\",\n                    \"_id\": \"5cf817587ebb8a2c35e0d665\",\n                    \"__v\": 0\n                },\n                {\n                    \"issueId\": \"x6j5QrYPo\",\n                    \"issueStatus\": \"done\",\n                    \"issueTitle\": \"title of issue1\",\n                    \"issueDescription\": \"description of issue1\",\n                    \"issueReporter\": \"vivek\",\n                    \"issueReporterEmail\": \"i123vivek@gmail.com\",\n                    \"issueAssignee\": \"rahul\",\n                    \"issueAssigneeEmail\": \"rahul12@gmail.com\",\n                    \"issueCreatedOn\": \"2019-06-02T10:02:20.000Z\",\n                    \"screenshotName\": \"1560424747076_Screenshot from 2019-06-13 16-48-49.png\",\n                    \"screenshotPath\": \"uploads/1560424747076_Screenshot from 2019-06-13 16-48-49.png\",\n                    \"_id\": \"5cf39eacadc77329d9f78461\",\n                    \"__v\": 0\n                },\n                {\n                    \"issueId\": \"eYNtIFp7y\",\n                    \"issueStatus\": \"done\",\n                    \"issueTitle\": \"title of issue1\",\n                    \"issueDescription\": \"description of issue1\",\n                    \"issueReporter\": \"vivek\",\n                    \"issueReporterEmail\": \"i123vivek@gmail.com\",\n                    \"issueAssignee\": \"satu\",\n                    \"issueAssigneeEmail\": \"satu@gmail.com\",\n                    \"issueCreatedOn\": \"2019-06-01T06:04:35.000Z\",\n                    \"screenshotName\": \"\",\n                    \"screenshotPath\": \"\",\n                    \"_id\": \"5cf215738cb8111312d832b0\",\n                    \"__v\": 0\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "GetApiV1UsersIssueTextSearch"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:issueId/get/watcherList",
    "title": "to get watcherList of an issue .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"All Watcher Details Found\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"watcherId\": \"kMl4MTmxA\",\n                    \"issueId\": \"HsH5m_yLP\",\n                    \"watcherEmail\": \"birendra@gmail.com\",\n                    \"createdOn\": \"2019-06-15T20:24:40.000Z\"\n                },\n                {\n                    \"watcherId\": \"k3QQr-c9q\",\n                    \"issueId\": \"HsH5m_yLP\",\n                    \"watcherEmail\": \"rahul12@gmail.com\",\n                    \"createdOn\": \"2019-06-15T20:52:24.000Z\"\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "GetApiV1UsersIssueidGetWatcherlist"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:issueId/issueDetails",
    "title": "to get issue details of an issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of an issue. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Issue details found\",\n            \"status\": 200,\n            \"data\": {\n                \"issueId\": \"5pmL7HgdX\",\n                \"issueStatus\": \"In-Progress\",\n                \"issueTitle\": \"ertgvgh\",\n                \"issueDescription\": \"vrtb\",\n                \"issueReporter\": \"rahul rai\",\n                \"issueReporterEmail\": \"rahul12@gmail.com\",\n                \"issueAssignee\": \"\",\n                \"issueAssigneeEmail\": \"satu@gmail.com\",\n                \"issueCreatedOn\": \"2019-06-14T11:20:46.000Z\",\n                \"screenshotName\": \"1560511234459_image\",\n                \"screenshotPath\": \"uploads/1560511234459_image\"\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "GetApiV1UsersIssueidIssuedetails"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:issueId/view/comment",
    "title": "to view comments of an issue .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"comment Found\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"commentId\": \"CUDA05SoX\",\n                    \"issueId\": \"HsH5m_yLP\",\n                    \"comment\": \"working on the  project \",\n                    \"commenter\": \"vivek\",\n                    \"commenterEmail\": \"i123vivek@gmail.com\",\n                    \"createdOn\": \"2019-06-15T20:09:30.000Z\"\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "GetApiV1UsersIssueidViewComment"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/mark/notification/seen",
    "title": "to mark notification as seen.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "notificationId",
            "description": "<p>notificationId of the user. (Send notificationId as query parameter) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Marked As Seen\",\n            \"status\": 200,\n            \"data\": {\n                \"notificationId\": \"Y3GEnkynj\",\n                \"notificationStatus\": \"seen\",\n                \"userEmailToSendNotification\": [\n                    \"satu@gmail.com\",\n                    \"birendra@gmail.com\"\n                ],\n                \"_id\": \"5d051e8955c1e60d37edeeb1\",\n                \"notificationIssueId\": \"Ms_VDaYOU\",\n                \"notificationMessage\": \"hey a new issue is something Updated in Issue Details Details [object Object]\",\n                \"notificationPurpose\": \"edit\",\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "GetApiV1UsersMarkNotificationSeen"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/view/allIssues",
    "title": "to get user details.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"All issue details found\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"issueId\": \"x6j5QrYPo\",\n                    \"issueStatus\": \"done\",\n                    \"issueTitle\": \"title of issue1\",\n                    \"issueDescription\": \"description of issue1\",\n                    \"issueReporter\": \"vivek\",\n                    \"issueReporterEmail\": \"i123vivek@gmail.com\",\n                    \"issueAssignee\": \"rahul\",\n                    \"issueAssigneeEmail\": \"rahul12@gmail.com\",\n                    \"issueCreatedOn\": \"2019-06-02T10:02:20.000Z\",\n                    \"screenshotName\": \"1560424747076_Screenshot from 2019-06-13 16-48-49.png\",\n                    \"screenshotPath\": \"uploads/1560424747076_Screenshot from 2019-06-13 16-48-49.png\"\n                },\n                {\n                    \"issueId\": \"jHK5N9SAM\",\n                    \"issueStatus\": \"In-BackLog\",\n                    \"issueTitle\": \"asd\",\n                    \"issueDescription\": \"sdf\",\n                    \"issueReporter\": \"satu rai\",\n                    \"issueReporterEmail\": \"satu@gmail.com\",\n                    \"issueAssignee\": \"rahul+rai\",\n                    \"issueAssigneeEmail\": \"rahul@gmail.com\",\n                    \"issueCreatedOn\": \"2019-06-15T09:42:04.000Z\",\n                    \"screenshotName\": \"1560598158503_Screenshot from 2019-05-14 16-27-32.png\",\n                    \"screenshotPath\": \"uploads/1560598158503_Screenshot from 2019-05-14 16-27-32.png\"\n                },\n                {\n                    \"issueId\": \"Ms_VDaYOU\",\n                    \"issueStatus\": \"In-Progress\",\n                    \"issueTitle\": \"issue 1\",\n                    \"issueDescription\": \"issue description of issue 1 again once again 2121999\",\n                    \"issueReporter\": \"birendra rai\",\n                    \"issueReporterEmail\": \"birendra@gmail.com\",\n                    \"issueAssignee\": \"satu+rai\",\n                    \"issueAssigneeEmail\": \"satu@gmail.com\",\n                    \"issueCreatedOn\": \"2019-06-15T16:31:13.000Z\",\n                    \"screenshotName\": \"1560620934291_Screenshot from 2019-05-14 16-27-32.png\",\n                    \"screenshotPath\": \"uploads/1560620934291_Screenshot from 2019-05-14 16-27-32.png\"\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "GetApiV1UsersViewAllissues"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/add/watcher",
    "title": "to add as a watcher for an issue .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "watcherEmail",
            "description": "<p>watcherEmail of the user to add as watcher. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"watcher Added\",\n            \"status\": 200,\n            \"data\": {\n                \"watcherId\": \"k3QQr-c9q\",\n                \"issueId\": \"HsH5m_yLP\",\n                \"watcherEmail\": \"rahul12@gmail.com\",\n                \"createdOn\": \"2019-06-15T20:52:24.000Z\",\n                \"_id\": \"5d055a880ad9de204fecd8af\",\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "PostApiV1UsersAddWatcher"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/issue/create",
    "title": "to create new issue.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueStatus",
            "description": "<p>issueStatus of the issue. (body params(form-data)) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueTitle",
            "description": "<p>issueTitle of the issue. (body params(form-data)) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueDescription",
            "description": "<p>issueDescription of the issue. (body params(form-data)) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueReporter",
            "description": "<p>issueReporter of the issue. (body params(form-data)) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the issue. (body params(form-data)) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueAssignee",
            "description": "<p>issueAssignee of the issue. (body params(form-data)) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueAssigneeEmail",
            "description": "<p>issueAssigneeEmail of the issue. (body params(form-data)) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "image",
            "description": "<p>image of the issue. (body params(form-data)) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Issue created\",\n            \"status\": 200,\n            \"data\": {\n                \"issueId\": \"HsH5m_yLP\",\n                \"issueStatus\": \"done\",\n                \"issueTitle\": \"issueTitle12\",\n                \"issueDescription\": \"issue description of issue 12\",\n                \"issueReporter\": \"rahul\",\n                \"issueReporterEmail\": \"rahul12@gmail.com\",\n                \"issueAssignee\": \"vivek\",\n                \"issueAssigneeEmail\": \"i123vivek@gmail.com\",\n                \"issueCreatedOn\": \"2019-06-15T18:57:24.000Z\",\n                \"screenshotName\": \"1560625044472_IMG_0092.JPG\",\n                \"screenshotPath\": \"uploads/1560625044472_IMG_0092.JPG\",\n                \"_id\": \"5d053f94e1f981167f9e7876\",\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "PostApiV1UsersIssueCreate"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/write/comment",
    "title": "to comment on an issue .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "comment",
            "description": "<p>comment on the issue. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "commenter",
            "description": "<p>commenter of the issue. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "commenterEmail",
            "description": "<p>commenterEmail of the issue. (body params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Commented successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"commentId\": \"kKmJyBaV0\",\n                \"issueId\": \"HsH5m_yLP\",\n                \"comment\": \"working on  project  895484\",\n                \"commenter\": \"vivek\",\n                \"commenterEmail\": \"i123vivek@gmail.com\",\n                \"createdOn\": \"2019-06-15T20:43:33.000Z\",\n                \"_id\": \"5d0558750ad9de204fecd8ad\",\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "PostApiV1UsersWriteComment"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/:issueId/deleteIssue",
    "title": "to delete an issue .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Issue is deleted  successfully\",\n            \"status\": 200,\n            \"data\": {\n                \"issueId\": \"AEPtjYdwI\",\n                \"issueStatus\": \"done\",\n                \"issueTitle\": \"issueTitle1\",\n                \"issueDescription\": \"issue description of issue 2\",\n                \"issueReporter\": \"rahul\",\n                \"issueReporterEmail\": \"rahul12@gmail.com\",\n                \"issueAssignee\": \"vivek\",\n                \"issueAssigneeEmail\": \"i123vivek@gmail.com\",\n                \"issueCreatedOn\": \"2019-06-12T08:10:23.000Z\",\n                \"screenshotName\": \"1560327023794_Screenshot from 2019-05-17 20-49-39.png\",\n                \"screenshotPath\": \"uploads/1560327023794_Screenshot from 2019-05-17 20-49-39.png\",\n                \"_id\": \"5d00b36f983a720cdddd16fe\",\n                \"__v\": 0\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "PutApiV1UsersIssueidDeleteissue"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/:issueId/editIssue",
    "title": "to edit an issue .",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Issue details edited\",\n            \"status\": 200,\n            \"data\": {\n                \"n\": 1,\n                \"nModified\": 1,\n                \"ok\": 1\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "issues",
    "name": "PutApiV1UsersIssueidEditissue"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId/details",
    "title": "to get user details.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (query params) (required).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedIn user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n\n{\n            \"error\": false,\n            \"message\": \"Local User Details Found\",\n            \"status\": 200,\n            \"data\": {\n                \"userId\": \"-bejZiD7a\",\n                \"firstName\": \"rahul\",\n                \"lastName\": \"rai\",\n                \"userName\": \"rahul@gmail.com\",\n                \"email\": \"rahul@gmail.com\",\n                \"mobileNumber\": 9431562056,\n                \"issueWatchList\": [],\n                \"createdOn\": \"2019-05-19T16:00:10.000Z\"\n            }\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersUseridDetails"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/view/allUsers",
    "title": "to get all users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedin user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"get All User\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"userId\": \"-bejZiD7a\",\n                    \"firstName\": \"rahul\",\n                    \"lastName\": \"rai\",\n                    \"userName\": \"rahul@gmail.com\",\n                    \"password\": \"8659c6c0d2d71d1beeaf7d7b398cea98\",\n                    \"email\": \"rahul@gmail.com\",\n                    \"mobileNumber\": 9431562056,\n                    \"issueWatchList\": [],\n                    \"createdOn\": \"2019-05-19T16:00:10.000Z\"\n                },\n                {\n                    \"userId\": \"iF_JWlbvb\",\n                    \"firstName\": \"rahul\",\n                    \"lastName\": \"rai\",\n                    \"userName\": \"rahul12@gmail.com\",\n                    \"password\": \"8659c6c0d2d71d1beeaf7d7b398cea98\",\n                    \"email\": \"rahul12@gmail.com\",\n                    \"mobileNumber\": 9431562056,\n                    \"issueWatchList\": [],\n                    \"createdOn\": \"2019-05-22T13:09:58.000Z\"\n                },\n                {\n                    \"userId\": \"d482ykOcr\",\n                    \"firstName\": \"satu\",\n                    \"lastName\": \"rai\",\n                    \"userName\": \"satu@gmail.com\",\n                    \"password\": \"8659c6c0d2d71d1beeaf7d7b398cea98\",\n                    \"email\": \"satu@gmail.com\",\n                    \"mobileNumber\": 9898767600,\n                    \"createdOn\": \"2019-06-03T10:49:37.000Z\"\n                },\n                {\n                    \"userId\": \"KD4hi-PdC\",\n                    \"firstName\": \"vivek\",\n                    \"lastName\": \"rai\",\n                    \"userName\": \"i123vivek@gmail.com\",\n                    \"password\": \"8659c6c0d2d71d1beeaf7d7b398cea98\",\n                    \"email\": \"i123vivek@gmail.com\",\n                    \"mobileNumber\": 9898767600,\n                    \"createdOn\": \"2019-06-06T16:00:46.000Z\"\n                },\n                {\n                    \"userId\": \"LgTXJksy6\",\n                    \"firstName\": \"birendra\",\n                    \"lastName\": \"rai\",\n                    \"userName\": \"birendra@gmail.com\",\n                    \"password\": \"8659c6c0d2d71d1beeaf7d7b398cea98\",\n                    \"email\": \"birendra@gmail.com\",\n                    \"mobileNumber\": 9431582058,\n                    \"createdOn\": \"2019-06-15T16:14:37.000Z\"\n                },\n                {\n                    \"userId\": \"2120471434916596\",\n                    \"firstName\": \"Ashish\",\n                    \"lastName\": \"Tiwary\",\n                    \"userName\": \"ashishkiit42@gmail.com\",\n                    \"email\": \"ashishkiit42@gmail.com\",\n                    \"createdOn\": \"2019-06-04T11:00:23.000Z\"\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersViewAllusers"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/view/localUsers",
    "title": "to get all local users.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedin user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"All Users Details Found\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"userId\": \"-bejZiD7a\",\n                    \"firstName\": \"rahul\",\n                    \"lastName\": \"rai\",\n                    \"userName\": \"rahul@gmail.com\",\n                    \"password\": \"8659c6c0d2d71d1beeaf7d7b398cea98\",\n                    \"email\": \"rahul@gmail.com\",\n                    \"mobileNumber\": 9431562056,\n                    \"issueWatchList\": [],\n                    \"createdOn\": \"2019-05-19T16:00:10.000Z\"\n                },\n                {\n                    \"userId\": \"iF_JWlbvb\",\n                    \"firstName\": \"rahul\",\n                    \"lastName\": \"rai\",\n                    \"userName\": \"rahul12@gmail.com\",\n                    \"password\": \"8659c6c0d2d71d1beeaf7d7b398cea98\",\n                    \"email\": \"rahul12@gmail.com\",\n                    \"mobileNumber\": 9431562056,\n                    \"issueWatchList\": [],\n                    \"createdOn\": \"2019-05-22T13:09:58.000Z\"\n                },\n                {\n                    \"userId\": \"d482ykOcr\",\n                    \"firstName\": \"satu\",\n                    \"lastName\": \"rai\",\n                    \"userName\": \"satu@gmail.com\",\n                    \"password\": \"8659c6c0d2d71d1beeaf7d7b398cea98\",\n                    \"email\": \"satu@gmail.com\",\n                    \"mobileNumber\": 9898767600,\n                    \"createdOn\": \"2019-06-03T10:49:37.000Z\"\n                },\n                {\n                    \"userId\": \"KD4hi-PdC\",\n                    \"firstName\": \"vivek\",\n                    \"lastName\": \"rai\",\n                    \"userName\": \"i123vivek@gmail.com\",\n                    \"password\": \"8659c6c0d2d71d1beeaf7d7b398cea98\",\n                    \"email\": \"i123vivek@gmail.com\",\n                    \"mobileNumber\": 9898767600,\n                    \"createdOn\": \"2019-06-06T16:00:46.000Z\"\n                },\n                {\n                    \"userId\": \"LgTXJksy6\",\n                    \"firstName\": \"birendra\",\n                    \"lastName\": \"rai\",\n                    \"userName\": \"birendra@gmail.com\",\n                    \"password\": \"8659c6c0d2d71d1beeaf7d7b398cea98\",\n                    \"email\": \"birendra@gmail.com\",\n                    \"mobileNumber\": 9431582058,\n                    \"createdOn\": \"2019-06-15T16:14:37.000Z\"\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersViewLocalusers"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/view/socialUsers",
    "title": "to get all social users.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the loggedin user. (query params) (required).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\n{\n            \"error\": false,\n            \"message\": \"Social User Details Found\",\n            \"status\": 200,\n            \"data\": [\n                {\n                    \"userId\": \"1426569717486146\",\n                    \"firstName\": \"Vivek\",\n                    \"lastName\": \"Rai\",\n                    \"userName\": \"....vivek@gmail.com\",\n                    \"email\": \"....vivek@gmail.com\",\n                    \"createdOn\": \"2019-05-19T15:51:49.000Z\"\n                },\n                {\n                    \"userId\": \"2120471434916596\",\n                    \"firstName\": \"Ashish\",\n                    \"lastName\": \"Tiwary\",\n                    \"userName\": \"ashish.....@gmail.com\",\n                    \"email\": \"ashish.....@gmail.com\",\n                    \"createdOn\": \"2019-06-04T11:00:23.000Z\"\n                }\n            ]\n        }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersViewSocialusers"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkprdkJWVmgyWiIsImlhdCI6MTU2MDYyMTE1NDkyMywiZXhwIjoxNTYwNzA3NTU0OTIzLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZC1wMS1Jc3N1ZVRyYWNrZXJUb29sIiwiZGF0YSI6eyJ1c2VySWQiOiJLRDRoaS1QZEMiLCJmaXJzdE5hbWUiOiJ2aXZlayIsImxhc3ROYW1lIjoicmFpIiwidXNlck5hbWUiOiJpMTIzdml2ZWtAZ21haWwuY29tIiwiZW1haWwiOiJpMTIzdml2ZWtAZ21haWwuY29tIiwibW9iaWxlTnVtYmVyIjo5ODk4NzY3NjAwLCJjcmVhdGVkT24iOiIyMDE5LTA2LTA2VDE2OjAwOjQ2LjAwMFoifX0.Pn8aiCgAxGzFR_wcs_ZUg1EK-d1Vw9Z3xuhOCqKYQW4\",\n        \"userDetails\": {\n            \"userId\": \"KD4hi-PdC\",\n            \"firstName\": \"vivek\",\n            \"lastName\": \"rai\",\n            \"userName\": \"i123vivek@gmail.com\",\n            \"email\": \"i123vivek@gmail.com\",\n            \"mobileNumber\": 9898767600,\n            \"createdOn\": \"2019-06-06T16:00:46.000Z\"\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "to logout user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (auth headers) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobileNumber of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User created\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"qyxn6RQKu\",\n        \"firstName\": \"rakesh\",\n        \"lastName\": \"kr\",\n        \"userName\": \"rakesh@gmail.com\",\n        \"email\": \"rakesh@gmail.com\",\n        \"mobileNumber\": 9431582058,\n        \"createdOn\": \"2019-06-15T21:34:40.000Z\",\n        \"_id\": \"5d0564700ad9de204fecd8b0\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  }
] });