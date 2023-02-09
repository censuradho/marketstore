import { Controller } from "@nestjs/common";
import { SaleService } from "./sale.service";

@Controller()
export class SaleController {
  constructor (private readonly service: SaleService) {}
}