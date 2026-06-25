gen: 
	protoc \
	-I ../protos \
	--plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto \
	--ts_proto_out=./packages/gen/src \
	--ts_proto_opt=esModuleInterop=true,outputJsonMethods=true \
	../protos/email/v1/email.proto
