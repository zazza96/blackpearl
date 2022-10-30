# Running the project on localhost
To compile the code run 'npm i' in a terminal to install dependencies, then run 'npm run build' to compile the code. 

To start the server, run 'npm run buildServer' and then follow the localhost link provided on the terminal, which should be http://localhost:3000 .

# Candidate Task

Create a web application that makes Patient search requests to a REST endpoint and displays the results as a list.

## Requirements ##

- The web application should be able to search against patient date of birth, NHS number, family name, given name or any combination of the above (see examples below).
- The web application must display all returned patients as a selectable list.
- The web application must at a minimum display the name, date of birth and NHS Number of the returned patients.
- There is not a requirement to use it, but the [NHS design system](https://service-manual.nhs.uk/design-system) may provide a useful starting point for the UX.



## API Endpoint

**Base URL**

`https://59ae2c9240f849f6ac.develop.eu-west-2.quickfhir.cloud`

**Available Endpoints**

`/FHIR/Patient`

**Available Parameters**

- `identifier` (note: this takes the format of `identifier=https://fhir.nhs.uk/Id/nhs-number|NHS_NUMBER` - depending on your REST client you may need to escape the pipe symbol, i.e. `%7C`)

- `family`
- `given`
- `birthdate`

**Notes**

- Auth header _must_ be sent on each request, but its content is ignored, so you can put any credentials there.
- x-api-key header _must_ be sent on each request, and must equal `eXyaAcJ9fhpLuhB42YwKQOJ7XgmVYOaP`

**Example Requests**

```
//GET Patient using birthdate

curl --location --request GET 'https://59ae2c9240f849f6ac.develop.eu-west-2.quickfhir.cloud/FHIR/Patient?birthdate=1983-03-13' \
--header 'x-api-key: eXyaAcJ9fhpLuhB42YwKQOJ7XgmVYOaP' \
--header 'Authorization: Basic dGVzdHVzZXJAYmxhY2twZWFyLmNvbTphcmVxdWVzdA=='

//GET Patient using NHS Number

curl --location --request GET 'https://59ae2c9240f849f6ac.develop.eu-west-2.quickfhir.cloud/FHIR/Patient?identifier=https://fhir.nhs.uk/Id/nhs-number%7C9449306532' \
--header 'x-api-key: eXyaAcJ9fhpLuhB42YwKQOJ7XgmVYOaP' \
--header 'Authorization: Basic dGVzdHVzZXJAYmxhY2twZWFyLmNvbTphcmVxdWVzdA=='

//GET Patient using family name

curl --location --request GET 'https://59ae2c9240f849f6ac.develop.eu-west-2.quickfhir.cloud/FHIR/Patient?family=roberts' \
--header 'x-api-key: eXyaAcJ9fhpLuhB42YwKQOJ7XgmVYOaP' \
--header 'Authorization: Basic dGVzdHVzZXJAYmxhY2twZWFyLmNvbTphcmVxdWVzdA=='

//GET Patient using given name

curl --location --request GET 'https://59ae2c9240f849f6ac.develop.eu-west-2.quickfhir.cloud/FHIR/Patient?given=darren' \
--header 'x-api-key: eXyaAcJ9fhpLuhB42YwKQOJ7XgmVYOaP' \
--header 'Authorization: Basic dGVzdHVzZXJAYmxhY2twZWFyLmNvbTphcmVxdWVzdA=='

```



**Example Response**

```
{
    "resourceType": "Bundle",
    "id": "ec1d3e96-be5a-4948-a6cf-38a0287bc830",
    "meta": {
        "lastUpdated": "2021-07-02T12:23:01.002Z"
    },
    "type": "searchset",
    "total": 1,
    "link": [
        {
            "relation": "self",
            "url": "https://59ae2c9240f849f6ac.develop.eu-west-2.quickfhir.cloud/FHIR/Patient?identifier=https%3A%2F%2Ffhir.nhs.uk%2FId%2Fnhs-number%7C9449306532"
        }
    ],
    "entry": [
        {
            "search": {
                "mode": "match"
            },
            "resource": {
                "id": "035f688a903e58a102fcbd9e688306e8",
                "resourceType": "Patient",
                "meta": {
                    "profile": [
                        "GPConnect-Patient-1-0"
                    ]
                },
                "identifier": [
                    {
                        "value": "9449306532",
                        "system": "https://fhir.nhs.uk/Id/nhs-number"
                    }
                ],
                "name": [
                    {
                        "given": [
                            "KACEY",
                            "HILDA"
                        ],
                        "family": [
                            "REDDINGS"
                        ]
                    }
                ],
                "address": [
                    {
                        "line": [
                            "DUKES WOOD",
                            "BOXHILL ROAD",
                            "TADWORTH",
                            "SURREY"
                        ],
                        "use": "home",
                        "postalCode": "KT20 7PQ"
                    }
                ],
                "telecom": [],
                "managingOrganization": {
                    "reference": "#f5904038e6ac0165161b8d0267eb94fd"
                },
                "contained": [
                    {
                        "resourceType": "Organization",
                        "meta": {
                            "profile": [
                                "GPConnect-Organization-1-0"
                            ]
                        },
                        "id": "f5904038e6ac0165161b8d0267eb94fd",
                        "identifier": [
                            {
                                "system": "https://fhir.nhs.uk/Id/ods-site-code",
                                "value": "H81109"
                            },
                            {
                                "system": "https://fhir.nhs.uk/Id/ods-organization-code",
                                "value": "H81109"
                            }
                        ],
                        "address": [
                            {
                                "line": [
                                    "ELM ROAD",
                                    "CLAYGATE",
                                    "ESHER",
                                    "SURREY"
                                ],
                                "postalCode": "KT10 0EH"
                            }
                        ],
                        "telecom": [
                            {
                                "value": "tel:01372462501",
                                "use": "work",
                                "system": "phone"
                            }
                        ],
                        "name": "CAPELFIELD SURGERY"
                    }
                ],
                "gender": "",
                "birthDate": "1983-03-13"
            }
        }
    ]
}
```



**Example Patient Demographics**

The attached 'All PDS Data' spreadsheet contains the details of all the Patients available in the system.

A full specification of the patient resource can be found [here](http://hl7.org/fhir/STU3/patient.html).



**Notes**

- The endpoint is a lambda function, so can take a few seconds to spin up if it's in a cold state.
- The endpoint is behind a firewall that will block requests from a non-GB IP address.
- Please complete this task to the standard that you set for real work destined for production environments.
- Share the library however is easiest for you (zip file, link to a repo, etc). We won't be judging anything based on this!
