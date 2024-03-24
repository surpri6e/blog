/** Do string with data of creating block */
export function dateFormatter(date: Date): string {
   const dateString = date.toString().slice(4, 15);
   let month = dateString.slice(0, 3);

   if (month === 'Jan') month = '01';
   if (month === 'Feb') month = '02';
   if (month === 'Mar') month = '03';
   if (month === 'Apr') month = '04';
   if (month === 'May') month = '05';
   if (month === 'Jun') month = '06';
   if (month === 'Jul') month = '07';
   if (month === 'Aug') month = '08';
   if (month === 'Sep') month = '09';
   if (month === 'Oct') month = '10';
   if (month === 'Nov') month = '11';
   if (month === 'Dec') month = '12';

   const result = dateString.slice(4, 6) + ':' + month + ':' + dateString.slice(7, 12);

   return result;
}
