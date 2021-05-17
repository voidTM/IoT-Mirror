from tkinter import *
import requests
import json

url = "https://p97slgeux0.execute-api.us-east-1.amazonaws.com/default/iot_final_user_info"

def delete_window(e):
    root.destroy()

def test_login():
    print("verifying login attempt...")
    body = json.dumps({"username": username.get(), "password": password.get()})
    request = requests.post(url, body)
    response = json.loads(request.content)
    if request.status_code == 200:
        print(response)
        root.destroy()
    else:
        print("invalid username or password")

root = Tk()
root.title('Smart Mirror Touch Screen Login')
root.attributes('-fullscreen', True)
root.wm_attributes('-topmost', 1)
root.focus_set()
root.bind("<Escape>", delete_window)
root.configure(bg='black')


w = Label(root, text="SMART MIRROR LOGIN")

# create username and password and authenticate

username = StringVar()
password = StringVar()

# login label
username_label = Label(root, text="Username: ", background="black", font=("Times New Roman", 24), justify=CENTER, height=5, fg="white")
password_label = Label(root, text="Password: ", background="black", font=("Times New Roman", 24), justify=CENTER, height=5, fg="white")

# login entry
username_entry = Entry(root, textvariable=username)
password_entry = Entry(root, textvariable=password)

# organize labels on tkinter grid
username_label.grid(row=5,column=8, sticky="w")
username_entry.grid(row=5,column=10)
password_label.grid(row=7,column=8, sticky="w")
password_entry.grid(row=7,column=10)

# submit button
submit_button = Button(text="Login", command=test_login)
submit_button.grid(row=8, column=10, sticky="e")
root.mainloop()


