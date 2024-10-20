import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('uploadImg')
export class UploadController {
    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads', // Specify the upload folder
            filename: (req, file, callback) => {
                // Use a custom filename format (e.g., timestamp + original extension)
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname); // Get the file extension
                const filename = `${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
    }))
    uploadFile(@UploadedFile() file) {
        console.log(file);
    }
    
    // Get image
    @Get(':imagePath')
    seeUploadsFile(@Param('imagePath') image, @Res() res){
        return res.sendFile(image, {
            root: 'uploads',
        });
    }

    
}
