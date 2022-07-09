MSYS_NO_PATHCONV=1 \
docker run --rm -v "${PWD}/..:/local/" openapitools/openapi-generator-cli generate \
    -i http://host.docker.internal:3002/api-json/ \
    -g typescript-axios \
    -o /local/api-client