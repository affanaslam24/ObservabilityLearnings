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

