# Retail Product API
This is application is the back end for an e-commerce site. This is Express.js API that uses Sequelize to interact with a MySQL database.

# Endpoints

The REST API to the example app is described below.

## Get list of All Products

### Request

`GET /api/products`

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    [
  {
    "id": 1,
    "product_name": "Plain T-Shirt",
    "price": 15,
    "stock": 14,
    "category_id": 1,
    "category": {
      "id": 1,
      "category_name": "Shirts"
    },
    "tags": [
      {
        "id": 6,
        "tag_name": "white",
        "product_tag": {
          "id": 1,
          "product_id": 1,
          "tag_id": 6
        }
      }]
  }
    ]
## Table of Contents 
==================================
* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Test](#Test)
## Installation
Below command should be executed npm run start
## Usage
Use this application to manage and track employees.
## Contribution
To contribute to this project, please make sure you follow the guidelines in The Contributor Covenant as general guidelines.
## Test
Invoke npm run start to test the application
## License
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/) 
## Questions
For any questions contact me at priyadamodar12@gmail.com or [Github](https://github.com/pkamble35)