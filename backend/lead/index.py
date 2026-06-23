import json
import os
import smtplib
from email.mime.text import MIMEText
from email.header import Header


def handler(event: dict, context) -> dict:
    '''
    Business: Принимает заявки на бесплатную консультацию по банкротству и отправляет их на email специалиста.
    Args: event - dict с httpMethod, body (name, phone, message); context - объект с request_id.
    Returns: HTTP response dict со статусом отправки заявки.
    '''
    method: str = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    body_data = json.loads(event.get('body', '{}'))
    name = str(body_data.get('name', '')).strip()
    phone = str(body_data.get('phone', '')).strip()
    message = str(body_data.get('message', '')).strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'}, ensure_ascii=False)
        }

    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    target_email = os.environ.get('TARGET_EMAIL', 'maria.mitroff@yandex.ru')

    if not all([smtp_host, smtp_user, smtp_password]):
        return {
            'statusCode': 200,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'success': True, 'pending': True}, ensure_ascii=False)
        }

    text = (
        f'Новая заявка на консультацию по банкротству\n\n'
        f'Имя: {name}\n'
        f'Телефон: {phone}\n'
        f'Сообщение: {message or "—"}\n'
    )

    msg = MIMEText(text, 'plain', 'utf-8')
    msg['Subject'] = Header('Новая заявка с сайта', 'utf-8')
    msg['From'] = smtp_user
    msg['To'] = target_email

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, [target_email], msg.as_string())

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True}, ensure_ascii=False)
    }
