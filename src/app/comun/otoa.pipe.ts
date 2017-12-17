import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'otoa'
})
export class OtoaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let output = [];

	for (let k in value)
		if (!(args && args.purgeKey && (k == "key")))
			output.push({key:k, value:value[k]});

    return output;
  }
}
