# NavTechApp
Development of Restful API’s using ASP.NET

-Created ASP.Net Core Web App (MVC) project named NavTechApp.
-Created a database named NavTechDB (Find script file at NavTechApp\NavTechApp\Database design and script.)
-Created 2 API controllers - DefaultFieldsController() and CustomFieldsController()
-DefaultFieldsController() - returns the records from 'Products' Table with default fields
-CustomFieldsController() - returns the records from 'Products' Table with Custom fields
-When Application starts [SPGetAllRecords] is used to get all records from 'Products' Table and displays on the screen
-User can modify or delete records using the 'edit' or 'delete' icons respectively
-User can click on 'Add Record/s' to add one or more record to the Table.
-Add records page checks if the record already exists while adding the record.
-The user can add new row only if they have entered a record that does not already exist in the Table.
-ValidateRecordBeforeSubmit() is not yet complete. It is planned to check pre-existence all the records before pushing to Database.
-Logging has been done.
-Validations have been done.
-Exception handling - Done partially
-Return appropriate responses with status code by assuming various failure scenarios - Not done at all stages.
-Multiple record addition is done.
-Multiple record modify feature is not done. (User can modify one record at a time)
-User can delete one record at a time.

I faced few of the following issues - 
-I had a doubt about how to use the API data field1, field2, cfield1, cfield2 so could not use the APIs in the functionality however the APIs are functional.
-I thought I could use the combined fields list as a dropdown when user tries to add a record. so when user chooses 'field1' then automatically the 'Field Source' field
will become api/DefaultFields and similarly when user selects 'cfield1' then 'Field Source' field will become api/CustomeFields - This could not be implemented.

