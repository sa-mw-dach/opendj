FROM centos/httpd-24-centos7

# copy artifact build from the 'build environment'
#COPY ./www/ /usr/local/apache2/htdocs/

COPY ./www/ /var/www/html/
COPY ./my-httpd.conf /etc/httpd/conf/httpd.conf

