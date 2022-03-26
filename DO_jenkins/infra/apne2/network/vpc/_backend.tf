terraform {
  backend "s3" {
    bucket      = "devops-dev-tfbackend-s4"
    key         = "apne2/network/vpc/terraform.tfstate"
    region      = "ap-northeast-2"
    profile = "default"
#    role_arn    = "{ASSUMED_ROLE}"
    max_retries = 3
  }
}
