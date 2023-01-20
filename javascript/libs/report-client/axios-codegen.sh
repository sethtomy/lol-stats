MSYS_NO_PATHCONV=1 \
docker run --rm \
    -v "${PWD}/src:/local/" \
    -v "${PWD}/../../../openapi/report-api.json:/local/report-api.json" \
    openapitools/openapi-generator-cli generate \
    -i /local/report-api.json \
    -g typescript-axios \
    -o /local/api-client
