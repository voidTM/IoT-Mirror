import json
import boto3
def lambda_handler(event, context):
    body = json.loads(event["body"])
    # create a dynamoDB resource
    username = body['username']
    password = body['password']
    dynamoDB = boto3.resource('dynamodb')
    
    #access the table holding usn
    table = dynamoDB.Table('iot-smart-mirror')
    
    # check if username/password is correct
    try:
        response = table.get_item(Key={'username': username})['Item']
    except:
        response = {'username': 'DOES_NOT_EXIST', 'password': 'DOES_NOT_EXIST'}
    else:
        usn = response['username']
        pwd = response['password']
        
        # verify username and password the user provided is correct
        if usn == username and pwd == password:
            # successful login
            return {
                'statusCode': 200,
                'body': json.dumps('Success - user verified')
            }
    # unable to verify login
    response = {"message": "invalid username or password"}
    return {
        'statusCode': 400,
        'body': json.dumps(response)
    }
