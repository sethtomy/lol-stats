MSYS_NO_PATHCONV=1 \
docker run --rm \
    -v "${PWD}/src:/local/" \
    -v "${PWD}/../../../openapi/riot-proxy-api.json:/local/riot-proxy-api.json" \
    openapitools/openapi-generator-cli generate \
    -i /local/riot-proxy-api.json \
    -g typescript-axios \
    -o /local/api-client
