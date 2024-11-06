
# Project Title: Node.js Application Deployment with AWS ECR and Jenkins

## Overview
This project automates the deployment of a Node.js application using Docker containers. The deployment process utilizes various tools, including Terraform for infrastructure provisioning, Ansible for configuration management, and Jenkins for continuous integration and delivery (CI/CD). The application is hosted on an AWS EC2 instance and utilizes Amazon Elastic Container Registry (ECR) to store Docker images.

## Tasks Completed

1. **Infrastructure Setup**: 
   - Utilized **Terraform** to automate the provisioning of AWS cloud infrastructure.
   - Configured an EC2 instance with appropriate security groups and networking settings to host the Node.js application.

2. **Configuration Management**:
   - Used **Ansible** to automate the installation of Docker on the EC2 instance.
   - Ensured Docker is configured to start automatically on boot and installed the AWS CLI for ECR interactions.

3. **Docker Container Deployment**:
   - Created a **Dockerfile** for the Node.js application, defining how to build the application container.
   - Automated the deployment of the Docker container on the provisioned EC2 instance, ensuring that the latest application image is always used.

4. **CI/CD Pipeline Integration**:
   - Implemented a **Jenkins pipeline** that performs the following steps:
     - **Clones** the source code repository from GitHub.
     - **Builds** the Docker image from the application source code.
     - **Pushes** the Docker image to the Amazon ECR repository.
     - **Deploys** the Docker container on the EC2 instance by SSHing into it and executing deployment commands.

## Deployment Steps
1. **Clone Repository**: The pipeline clones the specified GitHub repository containing the Node.js application code.

2. **Build Docker Image**:
   - The pipeline logs into the Amazon ECR using AWS credentials.
   - It builds the Docker image using the provided Dockerfile and tags it for ECR.

3. **Push Docker Image**: The newly built Docker image is pushed to the configured Amazon ECR repository.

4. **Deploy to EC2**:
   - The pipeline establishes an SSH connection to the EC2 instance.
   - It pulls the latest Docker image from ECR.
   - The existing Docker container (if any) is stopped and removed, and a new container is launched using the latest image.

## Conclusion
This project demonstrates a complete CI/CD pipeline for deploying a Node.js application using Docker on AWS infrastructure. By utilizing Jenkins, Terraform, Ansible, and Docker, we have created a robust deployment solution that automates the process of building, testing, and deploying applications.

