---
title: "How JavaScript Works: Deploying a Nodejs application with Kubernetes"
date: "Sep 28, 2022"
readTime: "8 min read"
description: "A comprehensive guide on deploying Node.js applications using Kubernetes, covering container orchestration, Docker setup, and Kubernetes deployment configurations."
slug: "nodejs-kubernetes-deployment"
category: "DevOps"
---

# How JavaScript Works: Deploying a Nodejs application with Kubernetes

With the recent rise in the adoption of microservice architecture, we have seen more containers being used. With that, these containers might range to hundreds and even thousands of them. It is either mismanaged or impossible to manage that amount of containers. Traditionally, you could use Docker-compose to manage several containers simultaneously but this is not feasible if you have a lot of containers with much traffic and downtime.

This brings about a container orchestration — Kubernetes. There are a few alternatives to Kubernetes which are AWS EKS, GKE, Docker-compose, etc.

In this article, we will be looking at how to deploy a Nodejs application to Kubernetes. We will be looking at a brief overview of how Kubernetes works, build a simple web server, choose an image with Dockerfile defined, build the image and push it to a registry. After that is done, we define the Kubernetes Deployment object.

## Prerequisites

* Docker should be installed on your system
* A Docker hub account is required
* Nodejs should be installed on your system
* Minikube should be installed on your system
* Knowledge of Javascript and Nodejs is required
* Prior knowledge of Kubernetes is a plus but not necessary

## Kubernetes and a brief overview

![Kubernetes Architecture](./images/nodejs-kubernetes-deployment/kubernetes-architecture.png)

A clear definition of Kubernetes is that it is a container orchestration tool that helps manage and organize your containerized microservices while scaling them. At scale, we mean horizontal/vertical scaling, auto-healing, load-balancing — high availability, and disaster recovery — rollbacks. The first thing we need to ponder with is our containers. These containers are more or less isolated and need to be properly managed; load balanced, distributed, and connected to the outside world.

Take Kubernetes as a captain on a ship that manages both the ship and the containers on it. It can identify each container on its ship by a label referred to as a "nametag", thereby querying it using that nametag. On the ship, the container might have to be placed inside a "Pod" which can hold some containers that are related. These Pods are the smallest units in Kubernetes(our ship) and they're executable i.e they can run the containers in them.

In Kubernetes, each of these Pods can decide to replicate themselves, the replicated pods can be more or less but they must be running at every point in time. This management can only be done by the Replication Controller. It handles monitoring, manages the Pods lifecycle, has a template for each of the Pods which can help replicate them, and can scale the Pods horizontally and vertically.

Also, Kubernetes has what is called 'Service' which acts as a bridge between the Pods in a Node. With this, Pods can discover other Pods. Let's take, for example, a file-compressor backend service with 3 replicas; do not forget these backend servers are containerized each and inside a Pod, the frontend doesn't know which Pod it is but the Service handles the load balancing for that.

To summarize this so we go into the main reason for this article, these are the important Kubernetes vocabulary:

### Node
* It runs the Pods
* Communicates with the master
* Has a kubelet

### Pods
* Are within a Node
* Executes the containers in it
* Has 1+ containers in it

### Services
* Load balances
* Provides communication and discovery with other Pods
* Identifies Pods using a layer selector

### Deployment
* Indicates how many pods should run simultaneously
* Manages Pods in case any dies

## Building a simple Nodejs server

We are on our way to deploying a Nodejs server to Kubernetes, but the first thing we have to do is to build a simple application.

The first step is to create a project folder, and from the project folder, create a new Nodejs application using this command:

```bash
npm init -y
```

In the root directory, create an index.js file, and install the needed nodejs package by running:

```bash
npm install express
```

Next, in our `index.js` file, we create a simple server that will only return 'Kubernetes Deployment" as text:

```javascript
const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Kubernetes Deployment');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

Update the `scripts` section of your `package.json` file should look like this:

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

Now, by running `npm start` your server should be started and ready to be in a Docker container.

## Containerized server

Since we will be using Docker for this, I assume you have it installed, but if not, please follow these guidelines to install Docker.

And to dockerize our app, create a Dockerfile in the root directory by running this command:

```bash
touch Dockerfile
```

In our Dockerfile, there are a few things we will need to define and the first and most important one is the docker image. Since we are using Node for this application, our image will be based on node:

```dockerfile
FROM node:18-buster-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
```

If you noticed, we used the `node:18-buster-slim` node image in the code above, but this can be any image of your choice. It doesn't matter here now.

Next, we define an app directory in our container `/usr/src/app`, The directory could be anything but it is common to define it inside the `/usr` directory.

And, we use a wildcard to copy all files that are `.json` so it covers the `package.json` and `package-lock.json`.

Furthermore, we install dependencies and copy all files in our local directory into our container. Do not forget to create a `.dockerignore` file to ignore huge folders like `node_modules`.

Lastly, we expose the port `8080` and set the base command.

Following this, we will build the application. But before building the application, log into your docker hub account and create a new Docker hub repository called `kubernetes_deploy`. Then you can build the Docker image by running:

```bash
docker build -t vectormike/kubernetes_deploy .
```

Note: use your docker hub account, not mine(vectormike) to build your docker file.

When this is successful, you can run the image that your application the container works:

```bash
docker run -p 8080:8080 vectormike/kubernetes_deploy
```

Finally, push this image to your docker hub so it is accessible in Kubernetes:

```bash
docker push vectormike/kubernetes_deploy
```

## Deployment with Kubernetes

For the sake of learning how to deploy to Kubernetes, we will have to use minikube for this. Minikube is typically meant for testing and running locally on your system. It helps you create a single node cluster inside a VM on your machine rather than a production-ready master node. It is equally easy to set up using its documentation.

Our first step here is to create a `deployment.yaml` file in the root directory and define our resource for deployment in the YAML file.

So, this file will contain the desired `Deployment` state for our application. So, if the desired state is 2 — — which is two Pods, and one of the Pods dies, it creates a new one automatically to replace it.

Also, the `Service` definition in the `deployment.yaml` file above is to enable communication between each pod and outside the cluster.

So, in our `deployment.yaml` file, our Service and `Deployment` definition will look like this:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 5
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: vectormike/kubernetes_deploy
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  type: LoadBalancer
  ports:
  - port: 8080
    targetPort: 80
    nodePort: 30001
  selector:
    app: myapp
```

Lastly, we deploy using the command:

```bash
kubectl apply -f deployment.yaml
```

As I stated earlier, our deployment will be in two parts: `Services` and `Deployment`.

The `Deployment` section states that we want five replicas of the Pod specified in `specs.replicas` with the first Pod as a template.

Inside of those Pods, we have our single container that contains our Nodejs application, and it is going to pull that image from the docker hub and run it — exposing port 8080:

In the `Service` section, we declare the name of the service and select the app from the `Deployment` section we defined for it to be accessible from the cluster. So in summary, our service is going to target the Pod `myapp`:

The ports are where it is a little bit confusing But, we are using a LoadBalancer, and within the cluster, each Pods are accessible using `port: 8080` that will then target the `port: 80`. So for us to access the cluster from outside, we use the `nodePort: 30001`.

Let's access our service using this command:

```bash
minikube service myapp
```

It should display the URL you will have to access from your browser.

Minikube also provides a GUI to view stats and anything else rather than using the API service or Command line. To do so, run this command:

```bash
minikube dashboard
```

## Conclusion

This article taught us how to deploy a simple Nodejs application with Kubernetes. This is pretty basic just to give you an overview of Kubernetes and deployment is configured. In another article, we will look at how to deploy the same Nodejs application which has a database, and more about volumes in Kubernetes.

You have to be very careful when you use Kubernetes and minikube because the implementation can be tricky.

So even if you feel like the proper decisions have been made, it's always necessary to verify that this is indeed true and your users have a great experience with your product.