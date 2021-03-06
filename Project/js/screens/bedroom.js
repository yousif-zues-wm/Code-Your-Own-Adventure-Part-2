//Add additional images to the preload
AddPreload("Key");
AddPreload("Paper");
AddPreload("Spell");
AddPreload("TaoistSword");

//The main function
function Main()
{
	//Title of the Room
	SetTitle("Bedroom");
	
	//Image background and walkable area
	CreateScreen("bedroom","107,207,246,207,257,192,511,194,518,209,648,212,656,193,690,193,788,393,15,393,107,207");
	
	//Adding the player
	CreatePlayer(620,190);
	
	//-Door
	DoorGym=CreateInvisibleObject("257,21,499,20,500,184,259,181");
	DoorGym.description="The Door to the gym, it's locked from the other side.";
	if(!SearchParameter("BedroomDoorOpen"))
	{
		DoorGym.use=DoorGym.look;
	}else{
		DoorGym.DoorTo("gym",350,280);
	}
	
	//-Window
	Window=CreateInvisibleObject("52,182,33,164,24,116,35,67,58,44,71,62,76,92,75,129,67,161");
	Window.description="A locked Window to the outside.";	
	
	if(SearchParameter("WindowOpen"))
	{
		Window.DoorTo("outsideleft",640,75);
	}else{
		Window.description+="It's sealed shut... AHA a keyhole";
		Window.use=WindowClosed;
		Window.UsableWith("Key",OpenWindow);
	}
	
	//-Window
	DoorHall=CreateInvisibleObject("781,364,699,193,704,30,788,43,783,44,781,226,781,364");
	DoorHall.description="Door to the hall.";
	DoorHall.DoorTo("hall",190,185);
	
	//-Drawer
	Picture=CreateInvisibleObject("122,97,122,53,160,56,159,95");
	Picture.description="Decorative picture, nothing interesting here.";
	
	//-Drawer
	Drawer=CreateInvisibleObject("197,181,217,181,218,200,195,198");
	Drawer.description=("It's empty");
	if(!SearchParameter("KeyTaken"))
	{
		Drawer.description=("Aha! here is the key to open the window.");
		Drawer.take=TakeKey;  
	}
	
	Bag=CreateInvisibleObject("136,174,122,165,124,161,132,156,141,160,144,168,146,171");
	Bag.description="It's an abandoned bag...... nothing of use here";
	
	Bonsai=CreateInvisibleObject("177,142,185,142,190,137,187,131,182,128,193,123,193,110,175,107,168,113,171,116,177,119,168,125,169,126,175,126,177,132,171,135");
	Bonsai.description="......... Nothing fo interest here..";
	
	Plant=CreateInvisibleObject("575,151,570,134,575,125,581,120,588,125,595,128,594,140,592,150,591,150,584,151");
	Plant.description="Hmmm... It needs a bit of  water seems to be dying.";
	
	Picture2=CreateInvisibleObject("588,98,588,54,628,53,627,97");
	Picture2.description="Just rust stains on the walls";
	
	MusicBox=CreateInvisibleObject("604,163,596,159,597,153,604,149,610,141,616,145,613,155,613,161");
	MusicBox.description=".......... nothing of interest here";
	
	Clothes=CreateInvisibleObject("619,176,618,141,641,141,640,177");
	Clothes.description="eww old wet chlothes must be atleast from the year  3100!!!";
	
	Pillow=CreateInvisibleObject("84,392,85,372,107,371,107,393"); 
	Pillow.description="Where is PR0XY";
	
	//-Cupboard1
	Cupboard1=CreateInvisibleObject("120,201,120,161,144,161,147,147,173,147,171,132,192,132,193,116,217,113,218,71,240,71,243,199");
	Cupboard1.description="An empty Cupboard, looks antique from over 1000 years ago... must have some value.";
	
	//-Cupboard2
	Cupboard2=CreateInvisibleObject("522,204,522,79,543,78,547,115,569,120,568,136,587,139,591,151,615,150,618,164,646,167,644,202,645,202,637,207");
	Cupboard2.description="Theese Cupboards look like they are older than the city!!!";
	
	//-Table
	if(!SearchParameter("YingFingRanaway"))
	{
		Table=CreateObject("Table",680,308);
		if(SearchParameter("PaperTaken"))
		{
			Table.description="I could write a program";
		}else{
			Table.description="Its...... Just an ARDUINO";
		}
		Table.take=TakePaper;
		Table.UsableWith("Paper",UsePaperTable);
	}else{
		Table=CreateObject("TableInk",40,308);
		Table.description="The Transistors are worn!! The ARDUINO wont work anymore!!!!";
	}
	
	//-Tea
	Tea=CreateObject("Tea",365,245);
	Tea.description="Eww the stench fills the room, smels worse thann the sewer water....";
	
	if(SearchParameter("WateronGrandad") && !SearchParameter("TalkedwithGrandad"))
	{
		Tea.description="Moldy Cold tea...... Reminds me of grandad..";
		Tea.take=function(){Player.Say("Ill take this to run tests Later.");};
		Tea.UsableWith("Barrel",TakeTea);
	}  
	//-Bed
	Bed=CreateInvisibleObject("80,257,150,255,181,357,167,363,34,363,25,358");
	Bed.description="I Wonder who this dead guy is.... i Need to find a way outta here.";
	
	if(!SearchParameter("WateronGrandad")) CreateParameter("Spell+Sword=TaoistSword");
}

function UsePaperTable()
{
	RemoveInventoryObject();
	AddInventory("Spell");
}
function TakePaper()
{
	if(!SearchParameter("PaperTaken"))
	{
		CreateParameter("PaperTaken");
		AddInventory("Paper");
		Player.Say("This ARDUINO seems useful ill save it for later.");
		Table.description="";
	}else{
		Player.Say("Nothing of use here....");
	}
}
function OpenWindow()
{
	Window.DoorTo("outsideleft",640,75);
	Window.description="Fianlly a way out......";
	RemoveInventoryObject();
	CreateParameter("WindowOpen");
	Player.Say("Done, It's open");
}

function WindowClosed()
{
	Player.Say("I can't open it its sealed shut");
}

function TakeKey()
{
	AddInventory("Key");
	Drawer.description=("Now It's empty");
	Drawer.take=Cantdo;
	CreateParameter("KeyTaken");
}

function TakeTea()
{
	RemoveInventoryObject();
	AddInventory("BarrelTea");
}
