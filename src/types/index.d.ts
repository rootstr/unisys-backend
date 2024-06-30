import "@fastify/jwt";
import { SignerCallBack } from "node";
import { MySQLPromisePool } from "@fastify/mysql";
import { AuthPayload } from "@/auth/core/models/authPayload.model";
import { EnvConf } from "@/config/env/core/models/envconf.model";
import { FastifyJwtNamespace, FastifyJwtSignOptions } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyInstance {
    config: EnvConf;
    mysql: MySQLPromisePool;
  }

  interface FastifyReply {
    accessJwtSign(payload: SignPayloadType, options?: FastifyJwtSignOptions): Promise<string>;
    accessJwtSign(payload: SignPayloadType, callback: SignerCallback): void;
    accessJwtSign(payload: SignPayloadType, options: FastifyJwtSignOptions, callback: SignerCallback): void;
    accessJwtSign(payload: SignPayloadType, options?: Partial<SignOptions>): Promise<string>;
    accessJwtSign(payload: SignPayloadType, options: Partial<SignOptions>, callback: SignerCallback): void;

    refreshJwtSign(payload: SignPayloadType, options?: FastifyJwtSignOptions): Promise<string>;
    refreshJwtSign(payload: SignPayloadType, callback: SignerCallback): void;
    refreshJwtSign(payload: SignPayloadType, options: FastifyJwtSignOptions, callback: SignerCallback): void;
    refreshJwtSign(payload: SignPayloadType, options?: Partial<SignOptions>): Promise<string>;
    refreshJwtSign(payload: SignPayloadType, options: Partial<SignOptions>, callback: SignerCallback): void;

  }

  interface FastifyRequest {
    accessJwtVerify<Decoded extends VerifyPayloadType>(options?: FastifyJwtVerifyOptions): Promise<Decoded>;
    accessJwtVerify<Decoded extends VerifyPayloadType>(callback: FastifyJwtVerifierCallback<Decoded>): void;
    accessJwtVerify<Decoded extends VerifyPayloadType>(options: FastifyJwtVerifyOptions, callback: FastifyJwtVerifierCallback<Decoded>): void;
    accessJwtVerify<Decoded extends VerifyPayloadType>(options?: Partial<VerifyOptions>): Promise<Decoded>;
    accessJwtVerify<Decoded extends VerifyPayloadType>(options: Partial<VerifyOptions>, callback: FastifyJwtVerifierCallback<Decoded>): void;

    accessJwtDecode<Decoded extends DecodePayloadType>(options?: FastifyJwtDecodeOptions): Promise<Decoded>;
    accessJwtDecode<Decoded extends DecodePayloadType>(callback: FastifyJwtDecoderCallback<Decoded>): void;
    accessJwtDecode<Decoded extends DecodePayloadType>(options: FastifyJwtDecodeOptions, callback: FastifyJwtDecoderCallback<Decoded>): void;

    refreshJwtVerify<Decoded extends VerifyPayloadType>(options?: FastifyJwtVerifyOptions): Promise<Decoded>;
    refreshJwtVerify<Decoded extends VerifyPayloadType>(callback: FastifyJwtVerifierCallback<Decoded>): void;
    refreshJwtVerify<Decoded extends VerifyPayloadType>(options: FastifyJwtVerifyOptions, callback: FastifyJwtVerifierCallback<Decoded>): void;
    refreshJwtVerify<Decoded extends VerifyPayloadType>(options?: Partial<VerifyOptions>): Promise<Decoded>;
    refreshJwtVerify<Decoded extends VerifyPayloadType>(options: Partial<VerifyOptions>, callback: FastifyJwtVerifierCallback<Decoded>): void;

    refreshJwtDecode<Decoded extends DecodePayloadType>(options?: FastifyJwtDecodeOptions): Promise<Decoded>;
    refreshJwtDecode<Decoded extends DecodePayloadType>(callback: FastifyJwtDecoderCallback<Decoded>): void;
    refreshJwtDecode<Decoded extends DecodePayloadType>(options: FastifyJwtDecodeOptions, callback: FastifyJwtDecoderCallback<Decoded>): void;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: AuthPayload;
  }
}