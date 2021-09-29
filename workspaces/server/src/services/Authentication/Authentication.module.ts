import { Module } from '@nestjs/common';
import { AuthenticationService } from './Authentication.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/entities/User/User.module';
import { LocalStrategy } from './Strategies/Local/Local.strategy';
import { AuthenticationController } from './Authentication.controller';
import { ConfigModule } from 'src/common/config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/common/config/config.service';
import { JwtStrategy } from './Strategies/Jwt/Jwt.strategy';

@Module({
	imports: [
		UserModule,
		PassportModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get("JWT_SECRET"),
				signOptions: {
					expiresIn: configService.get("JWT_EXPIRATION_TIME"),
				}
			})
		})
	],
	providers: [AuthenticationService, LocalStrategy, JwtStrategy],
	controllers: [AuthenticationController]
})
export class AuthenticationModule { }