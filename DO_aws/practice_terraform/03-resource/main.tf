provider "aws" {
  region = "ap-northeast-2"
}
data "aws_ami" "ubuntu" {
  most_recent = true  #  가장 최신의 AMI를 가져오겠다 하는 뜻

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical -> 우분투 만든 회사
}
resource "aws_instance" "ubuntu" { /* 블록 레이블을 두가지 지원. resource는 지시어 */
  ami           = data.aws_ami.ubuntu.image_id
  instance_type = "t2.micro" # 필요한 인자들은 aws_instance docs 참고해서 추가해

  tags = {
    Name = "fastcampus-ubuntu"
  }
}
