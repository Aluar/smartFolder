import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ntfilter'
})
export class NtfilterPipe implements PipeTransform 
{
  transform(value: any, args?: any): any 
  {
    let output = value;

    if (value && args && (typeof args.text == 'string') && args.tags)
	{
		output = value.filter(function(item, index, array)
		{
			let text = item.value.name.includes(args.text);

			
			let tags = (args.tags.length > 0)? 
			args.tags.every((element, i, a) => { return item.value.tags.includes(element); }) : true;
			
			return text && tags;
		});
	}

    return output;
  }
}
