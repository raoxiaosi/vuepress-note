# elk

> elk（ElasticSearch, Logstash, Kibana）实时日志分析系统
>
> docker-compose 安装



### elasticsearch

> docker-compose.yml

~~~yaml
version: '3'
services:
  elasticsearch:
    restart: always
    image: docker.io/elasticsearch:6.8.4
    environment:
      - discovery.type=single-node
    ports:
      - 9200:9200
    volumes:
      - 映射数据目录:/usr/share/elasticsearch/data
    deploy:
      resources:
        limits:
          memory: 2G
        reservations:
          memory: 500M
~~~

> 启动容器 docker-compose --compatibility up -d



### Kibana

> docker-compose.yml

~~~yaml
version: '3'
services:
  
  kibana:
    restart: always
    image: docker.io/kibana:6.8.4
    environment:
      SERVER_NAME: kibana
      ELASTICSEARCH_HOSTS: http://***:9200
      ELASTICSEARCH_URL: http://***:9200
    volumes: 
      - 映射插件目录:/usr/share/kibana/plugins
      - 映射配置目录:/usr/share/kibana/config
    ports:
      - 5601:5601
    deploy:
      resources:
        limits:
          memory: 2G
        reservations:
          memory: 500M
~~~

> 启动容器 docker-compose --compatibility up -d



### logstash

> docker 安装

~~~sh
docker pull logstash:7.4.2

docker run -d --restart=always --log-driver json-file -p 5044:5044 --name logstash -v /usr/local/docker/logstash/config/logstash.yml:/usr/share/logstash/config/logstash.yml -v /usr/local/docker/logstash/conf.d/:/usr/share/logstash/conf.d/ -v /home/gitlab-runner/agt-cis-api/logs/:/usr/share/logstash/agt-cis-api/logs/ logstash:7.4.2
~~~

> docker-compose.yml

~~~yaml
version: '3'
services:
  logstash:
    image: docker.io/logstash:6.8.4
    container_name: logstash
    restart: always
    ports:
      - 5044:5044
    environment:
      LS_JAVA_OPTS: "-Xmx256m -Xms256m"
    volumes:
      - /develop/logstash/config/logstash.yml:/usr/share/logstash/config/logstash.yml
      - /develop/logstash/conf.d/:/usr/share/logstash/conf.d/
      - /home/gitlab-runner/agt-cis-api/logs/:/usr/share/logstash/agt-cis-api/logs/
~~~

