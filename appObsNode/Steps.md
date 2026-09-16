### Steps to Replicate:
Step1 - Add Client inside your App for allowing Prom Client Integration inside the application.
Step2 - For Default Metrics from the Application (how many http req and res, and other related inbuilt Metrics): collectDefaultMetrics and Register
Step3 - Expose the /metric to allow the Prometheus Metric logs being visible


---

### Prometheus Server
Next is to Visualise the Metric data, we need a Promethues VIsualiser
For that we have the Promethues config and Running Prometheus Server at a specific Endpoint through docker.
- prometheus-config.yml
- Then running prom server attching the Prometheus yml in the volumes of the container, using Docker Compose

---

### Grafana
For Dashboard view through Grafana we are going to next set up Grafana through Docker:
docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss


---

FLOW:
- Attach the Prom Client on the APP -> /8080/metric
- Attahc /8080/metric to the promConfig and run a Prom Server -> /3000
- Attach the Prom Server for that Prom Server of that target to the Grafana Data source

App -> Node Deployed in LocalHost -> Prom Server Through Docker Compose connected to the APP through Targets -> GRafana Dashboard through Docker connected to the Prom server through Data source.

---

NEXT UP, we will be ADDING LOKI to the Stack -

# LOKI - Logging
USing Docker to initiate a Loki server:
docker run -d --name=loki -p 3100:3100 grafana/loki

Then this server will be connected to the APP and then to the Grafana Server through DataSource.
Add the URL: host: "http://127.0.0.1:3100" as the HOst for options in Loki

- Run the Server
- Add the Loki Package to the App and add the Server as a host to the Code itself
(This is opposite of what was happening in Grafana. In grafana, you were supposed to be Adding the Exposed app to the Target in the PromServers Config file, here you add the LokiServer to the Application)


---

### Connections:

APP -> Exposed
PromServer -> Docker -> Connects to APP Target
LokiServer -> Docker -> App's Logger
Grafana -> Docker Compose -> Datasource Connectivity to PromServer + LokiServer



---

Docker Commands:
- PromServer:
    Docker compose up on the compose.yml file
- Grafana:
    docker run -d -p 3000:3001 --name=grafana grafana/grafana-oss
- Loki:
    docker run -d --name=loki -p 3100:3100 grafana/loki

---

Links and stuff:
App exposed: 192.168.1.50:3000
    Metrics: 192.168.1.50:3000/metrics
PromServer in Compose uses appsNodeBridge Network, and to connect one docker to another docker: http://host.docker.internal:9090
Grafana: localHost:3001
Loki server: localHost:3100 and to visualise - localhost:3100/metrics
