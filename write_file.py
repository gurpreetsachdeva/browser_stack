with open("my_log.txt","r+") as f:
	for i in range(10000000):
		f.write(str(i)+"\n")

