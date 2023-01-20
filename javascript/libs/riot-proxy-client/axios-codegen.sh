MSYS_NO_PATHCONV=1 \
docker run --rm -v "${PWD}/src:/local/" openapitools/openapi-generator-cli generate \
    -i http://host.docker.internal:3001/api-json/ \
    -g typescript-axios \
    -o /local/api-client
