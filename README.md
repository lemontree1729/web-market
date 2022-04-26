# how to set develop server(with ubuntu)

* run `sudo apt-get update` to update all
* run `sudo apt-get nginx` to install nginx
* fetch your forked repository from github
* run `sudo rm -r web-market/*` to delete all file with web-market if exist
* run `cd web-market`
* run `sudo git pull`
* run `sudo npm install` from target folder
* run `sudo service nginx stop` to stop server
* run `sudo touch .env.loc` to make local file and add envs
* run `cd /etc/nginx/sites-enabled`
* run `sudo vim default` to open default file
* remove line start with `root /www......etc/;`
* replace upper to below(upper one could different for each computer)

```
 location / {
  # First attempt to serve request as file, then
  # as directory, then fall back to displaying a 404.
  try_files $uri $uri/ =404;
 }
```

```
   location / {

 # Reverse proxy for Next server

    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Port $server_port;
   }
```


* run `sudo service nginx start` to start nginx server
* move to folder that has package.json(nextjs folder)
* run `sudo npm run build` to build
<!-- * run `sudo npm run start` to start -->
* run `npm install pm2@latest -g` to install pm2
* run `pm2 install pm2-logrotate` to install pm2-logrotate
* run `pm2 start ecosystem.config.js` to start

- 메인페이지
![메인페이지](https://user-images.githubusercontent.com/91059315/165332341-334206ad-bdbc-43b7-b692-6d5f86bd3a56.gif)

- 회원가입
![회원가입](https://user-images.githubusercontent.com/91059315/165332145-3057dcab-5687-4cf8-8662-fa68fba7b7ba.gif)

- 상품페이지
![category](https://user-images.githubusercontent.com/91059315/165332428-466406a9-de33-4806-ace6-1408b57e4d93.gif)
- qna
![qna](https://user-images.githubusercontent.com/91059315/165332681-5600407f-8bc7-4f87-aa3c-cabc5afbe45a.gif)


