#!/usr/bin/env bash
# Build and publish the portfolio to S3 + CloudFront.
#   ./scripts/deploy-aws.sh            (uses the AWS CLI profile "lms")
set -euo pipefail
cd "$(dirname "$0")/.."
PROFILE=${AWS_PROFILE:-lms}
BUCKET=rohitkumar-portfolio-418295703384
DISTRIBUTION=EGFAGSSOX7P99

npm run build
# Hashed assets never change, so browsers may keep them for a year.
aws --profile "$PROFILE" s3 sync dist/assets "s3://$BUCKET/assets" --delete --cache-control "public, max-age=31536000, immutable" --only-show-errors
aws --profile "$PROFILE" s3 sync dist "s3://$BUCKET" --exclude "assets/*" --exclude "index.html" --delete --cache-control "public, max-age=86400" --only-show-errors
# index.html is always revalidated, so a new deploy shows up immediately.
aws --profile "$PROFILE" s3 cp dist/index.html "s3://$BUCKET/index.html" --cache-control "no-cache" --content-type "text/html; charset=utf-8" --only-show-errors
aws --profile "$PROFILE" cloudfront create-invalidation --distribution-id "$DISTRIBUTION" --paths "/*" --query Invalidation.Id --output text
echo "Live: https://dg5crhn2nhvy6.cloudfront.net"
