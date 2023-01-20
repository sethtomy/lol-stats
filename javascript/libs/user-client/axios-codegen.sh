MSYS_NO_PATHCONV=1 \
docker run --rm \
    -v "${PWD}/src:/local/" \
    -v "${PWD}/../../../openapi/user-api.json:/local/user-api.json" \
    openapitools/openapi-generator-cli generate \
    -i /local/user-api.json \
    -g typescript-axios \
    -o /local/api-client
