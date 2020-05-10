HOST=http://localhost:8080/api
TOKEN=$(curl -s -X POST -H "Content-Type: text/plain" -d @email-for-token.txt $HOST/token)
echo "Token: $TOKEN"
echo "Essai 1"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @input-to-justify.txt $HOST/justify
echo
echo "Essai 2"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @input-to-justify.txt $HOST/justify
echo
echo "Essai 3"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @input-to-justify.txt $HOST/justify
echo
sleep 5s
sleep 1m
echo "Essai 4 apres une minute"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @input-to-justify.txt $HOST/justify
echo
echo "Essai 5"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @input-to-justify.txt $HOST/justify
echo
echo "Essai 6"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @input-to-justify.txt $HOST/justify
echo
echo "Essai 7"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @input-to-justify.txt $HOST/justify
echo
sleep 2m
echo "Essai 8 apres deux minute"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @input-to-justify.txt $HOST/justify
echo
echo "Essai 9"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @input-to-justify.txt $HOST/justify
echo
echo "Essai 10"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @input-to-justify.txt $HOST/justify
echo
echo "Essai 11"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" -d @input-to-justify.txt $HOST/justify
echo