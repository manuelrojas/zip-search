# QUERY
```
query ($input: ZipInputFilter!) {
    GetZipInfo (input: $input) {
        country,
        postCode,
        countryAbbreviation,
        places {
            placeName,
            longitude,
            state,
            latitude,
            stateAbbreviation
        }
    }
}
```

# GRAPHQL VARIABLES

{
    "input": {
        "country": "mx",
        "postalCode": "01000"
    }
}