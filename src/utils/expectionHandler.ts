import { HttpException, HttpStatus } from "@nestjs/common";

export class ExceptionHandler {

  static badRequestId(id:number) {
    if (!id) {
      throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  static badRequestIdOrBody(id: number, bodys: any) {
    if (!id || bodys) {
      throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  static notFoundData(data: any) {
    if (!data) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
  }

  static notFoundIndex(idxNum: number) {
    if (idxNum !== -1) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
  }

}