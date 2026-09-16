## Basics
From what we have Learnt Of the Observability so far:
Observability consists of:
- Metrics
- Loggings
- Traces.

---

Continuing on this Idea we have been introduced to:
- Prometheus: Metric
- Loki: Logs
- Grafana for Visualising the Dashboards for this metric and loggings.

---

Using the Metrics and Loggings in One dashboard we should be able to Visualise the Systems' Trends, Patterns, spikes in one go.

Looking at the Time of spikes and such at the Metrics we can then view the Equivalent Logs of the System, and then Look at the Traces for Debugging the exact issue.

---

Next we need to understand what are we trying to Accomplish here:
- We need to observe the Application, The Whole Cluster in which the Application is deployed and Autoscaling, The Server inside which the Application is running upon.
So we have:
- Application (Integration with prometheus, Loki inside the app and exposing the /metric endpoint)
- K8s (Exposing the Cluster through Exporters and Service Gateways)
- Server (Exporters)
