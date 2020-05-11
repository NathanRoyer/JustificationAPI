HOST=http://localhost:7002/api
TOKEN=$(cat test/input-to-justify.txt | curl -s -X POST -H "Content-Type: text/plain" --data-binary @- $HOST/token)
echo "Invalid token submission:"
echo "$TOKEN"
TOKEN=$(cat test/email-for-token.txt | curl -s -X POST -H "Content-Type: text/plain" --data-binary @- $HOST/token)
echo "Valid token: $TOKEN"
echo "Testing user limits"
echo "---- Request #1"
cat test/input-to-justify.txt | curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" --data-binary @- $HOST/justify
echo
echo "---- Request #2"
cat test/input-to-justify.txt | curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" --data-binary @- $HOST/justify
echo
echo "---- Request #3"
cat test/input-to-justify.txt | curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" --data-binary @- $HOST/justify
echo
echo "---- Request #4 - no post body"
curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" $HOST/justify
echo
echo "---- Request #5 - no Content-Type header"
curl -s -X POST -H "token: $TOKEN" --data-binary @test/input-to-justify.txt $HOST/justify
echo
# sleep 5s
# echo "---- Request #6 after 5s"
# cat test/big-input-to-justify.txt | curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" --data-binary @- $HOST/justify
# echo
# echo "---- Request #7"
# cat test/big-input-to-justify.txt | curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" --data-binary @- $HOST/justify
# echo
# echo "---- Request #8"
# cat test/big-input-to-justify.txt | curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" --data-binary @- $HOST/justify
# echo
# echo "---- Request #8"
# cat test/big-input-to-justify.txt | curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" --data-binary @- $HOST/justify
# echo
# sleep 2m
# echo "---- Request #9 after 2mn"
# cat test/input-to-justify.txt | curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" --data-binary @- $HOST/justify
# echo
# echo "---- Request #10"
# cat test/input-to-justify.txt | curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" --data-binary @- $HOST/justify
# echo
# echo "---- Request #11"
# cat test/input-to-justify.txt | curl -s -X POST -H "Content-Type: text/plain" -H "token: $TOKEN" --data-binary @- $HOST/justify
# echo